import type { NextRequest } from 'next/server'
import type { SpotifyData } from '@/types/spotify'
import { Buffer } from 'node:buffer'
import process from 'node:process'
import { NextResponse } from 'next/server'

interface SpotifyTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
}

interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{
    id: string
    name: string
  }>
  album: {
    name: string
    images: Array<{
      url: string
      width: number
      height: number
    }>
  }
  external_urls: {
    spotify: string
  }
}

interface SpotifyCurrentlyPlayingResponse {
  is_playing: boolean
  item: SpotifyTrack | null
  currently_playing_type: string
}

// In-memory token storage (in production, use a database or Redis)
let accessToken: string | null = null
let tokenExpiry: number = 0

async function getAccessToken(): Promise<string> {
  // If we have a valid token, return it
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify credentials in environment variables')
  }

  try {
    // Use refresh token to get new access token
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`)
    }

    const tokenData: SpotifyTokenResponse = await response.json()

    accessToken = tokenData.access_token
    tokenExpiry = Date.now() + (tokenData.expires_in * 1000) - 60000 // 1 minute buffer

    return accessToken
  }
  catch (error) {
    console.error('Error refreshing Spotify token:', error)
    throw new Error('Failed to refresh Spotify token')
  }
}

async function getCurrentlyPlaying(): Promise<SpotifyCurrentlyPlayingResponse | null> {
  try {
    const token = await getAccessToken()

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 204) {
      // No content - user is not playing anything
      return null
    }

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`)
    }

    return await response.json()
  }
  catch (error) {
    console.error('Error fetching currently playing:', error)
    return null
  }
}

async function getSpotifyData(): Promise<SpotifyData> {
  try {
    const currentlyPlaying = await getCurrentlyPlaying()

    if (!currentlyPlaying || !currentlyPlaying.item) {
      return {
        isPlaying: false,
        track: null,
        artist: null,
        album: null,
        image: null,
        url: null,
      }
    }

    const track = currentlyPlaying.item
    const artist = track.artists[0]?.name || 'Unknown Artist'
    const album = track.album.name
    const image = track.album.images[0]?.url || null
    const url = track.external_urls.spotify

    return {
      isPlaying: currentlyPlaying.is_playing,
      track: track.name,
      artist,
      album,
      image,
      url,
    }
  }
  catch (error) {
    console.error('Spotify API error:', error)
    return {
      isPlaying: false,
      track: null,
      artist: null,
      album: null,
      image: null,
      url: null,
    }
  }
}

export async function GET(_request: NextRequest) {
  try {
    const spotifyData = await getSpotifyData()
    return NextResponse.json(spotifyData)
  }
  catch (error) {
    console.error('Spotify API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch currently playing track' },
      { status: 500 },
    )
  }
}
