import process from 'node:process'
import { NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  const hasCredentials = !!(clientId && clientSecret && refreshToken)

  return NextResponse.json({
    hasCredentials,
    clientId: clientId ? `${clientId.substring(0, 8)}...` : 'Not set',
    clientSecret: clientSecret ? 'Set' : 'Not set',
    refreshToken: refreshToken ? 'Set' : 'Not set',
    message: hasCredentials
      ? 'Spotify credentials are configured! You can now test the /api/spotify/currently-playing endpoint.'
      : 'Missing Spotify credentials. Please check your .env.local file.',
  })
}
