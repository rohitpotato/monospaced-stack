import { TTLCache } from '@isaacs/ttlcache'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

// Newsletter sign-ups from the site. The address goes straight to Resend as a
// contact (optionally into a segment); nothing is stored here.

const RESEND_API_URL = 'https://api.resend.com/contacts'

// Per-IP limit, so the endpoint can't be used to flood the contact list.
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000

const body = z.object({
  email: z.string().trim().toLowerCase().email().max(320),
  // Honeypot: hidden on the site, so only bots fill it in.
  website: z.string().max(500).optional()
})

export default async function subscribeRouter(fastify: FastifyInstance) {
  const attempts = new TTLCache<string, number>({ ttl: RATE_WINDOW_MS, max: 10_000 })

  fastify.post('/subscribe', async (req, reply) => {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      req.log.error('RESEND_API_KEY is not set')
      return reply.status(503).send({ error: 'Subscriptions are unavailable right now' })
    }

    const count = attempts.get(req.ip) ?? 0
    if (count >= RATE_LIMIT) {
      return reply.status(429).send({ error: 'Too many attempts, try again later' })
    }
    attempts.set(req.ip, count + 1)

    const parsed = body.safeParse(req.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Enter a valid email address' })
    }
    // A filled honeypot means a bot. Pretend it worked.
    if (parsed.data.website) {
      return reply.status(200).send({ ok: true })
    }

    const segmentId = process.env.RESEND_SEGMENT_ID
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: parsed.data.email,
        unsubscribed: false,
        ...(segmentId && { segments: [{ id: segmentId }] })
      }),
      signal: AbortSignal.timeout(5_000)
    })

    if (!res.ok) {
      const text = await res.text()
      // Signing up twice is fine, and shouldn't reveal who is already on the list.
      if (res.status === 409 || /already exists/i.test(text)) {
        return reply.status(200).send({ ok: true })
      }
      req.log.error({ status: res.status, body: text.slice(0, 500) }, 'Resend contact create failed')
      return reply.status(502).send({ error: 'Could not subscribe right now, try again later' })
    }

    return reply.status(200).send({ ok: true })
  })
}
