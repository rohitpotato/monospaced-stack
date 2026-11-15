'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const API_URL = 'https://api.rohitpotato.xyz'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'done' } | { kind: 'error', message: string }

export function SubscribeForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setStatus({ kind: 'sending' })
    try {
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.get('email'), website: form.get('website') || undefined }),
      })
      if (res.ok) {
        setStatus({ kind: 'done' })
        return
      }
      const data = await res.json().catch(() => ({})) as { error?: string }
      setStatus({ kind: 'error', message: data.error ?? 'Could not subscribe right now, try again later' })
    }
    catch {
      setStatus({ kind: 'error', message: 'Could not subscribe right now, try again later' })
    }
  }

  if (status.kind === 'done') {
    return (
      <p className={cn('font-sans text-sm text-inkBody', className)} role="status">
        Thanks, you're subscribed. New posts will land in your inbox.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className={cn('font-sans text-sm', className)}>
      <label htmlFor="subscribe-email" className="block text-inkSubtle">
        Get new posts by email. No spam, unsubscribe any time.
      </label>
      <div className="mt-2 flex max-w-md flex-wrap gap-2">
        <input
          id="subscribe-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-lg border border-divider bg-surface px-3 py-2 text-inkBody placeholder:text-inkSubtle focus:border-[var(--color-accent-cta)] focus:outline-none"
        />
        {/* Honeypot: hidden from people, filled in by bots */}
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={status.kind === 'sending'}
          className="rounded-lg bg-[var(--color-accent-cta)] px-4 py-2 font-medium text-[var(--color-on-accent)] transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status.kind === 'sending' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {status.kind === 'error' && (
        <p className="mt-2 text-[var(--color-accent-cta)]" role="alert">{status.message}</p>
      )}
    </form>
  )
}
