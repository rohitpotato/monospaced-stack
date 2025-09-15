'use client'
import type { SpotifyData } from '../types/spotify'
import React, { useEffect, useState } from 'react'
import { cn } from '../lib/utils'
import AudioEqualizer from './audio-equalizer'
import Typography from './typography'

const DecorativeWindow: React.FC = () => {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch('/api/spotify/currently-playing')
        if (response.ok) {
          const data = await response.json()
          setSpotifyData(data)
        }
        else {
          console.error('Failed to fetch Spotify data:', response.statusText)
        }
      }
      catch (error) {
        console.error('Error fetching Spotify data:', error)
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchSpotifyData()
  }, [])

  return (
    <div className={cn('hidden lg:block p-4 text-green-400 border-2 border-green-500/50')}>
      <div className="space-y-4">

        {/* Now Playing Section */}
        <div className="space-y-2">
          <Typography variant="body" as="p" color="tertiary">:: NOW PLAYING ::</Typography>
          <div className="flex items-center space-x-4">
            <AudioEqualizer />
            <div className="flex-1 min-w-0">
              {isLoading
                ? (
                    <Typography variant="h3" as="h2" color="white">Loading...</Typography>
                  )
                : spotifyData?.isPlaying && spotifyData?.track
                  ? (
                      <div className="space-y-1">
                        <Typography
                          variant="h3"
                          as="h2"
                          color="white"
                          className="truncate"
                          title={spotifyData?.track || undefined}
                        >
                          {spotifyData?.track}
                        </Typography>
                        <Typography
                          variant="bodyLarge"
                          as="p"
                          className="truncate"
                          title={spotifyData?.artist || undefined}
                        >
                          {spotifyData?.artist}
                        </Typography>
                      </div>
                    )
                  : (
                      <div className="space-y-1">
                        <Typography variant="h3" as="h2" color="white">Nothing Playing</Typography>
                        <Typography variant="bodyLarge" as="p" color="textMuted">Start your music</Typography>
                      </div>
                    )}
            </div>
          </div>
        </div>

        <div className={cn('border-t-2 border-green-500 w-full my-4')}></div>

        <Typography variant="body" as="p">
          メイド・イン・インディア - {new Date().getFullYear()}
        </Typography>

      </div>
    </div>
  )
}

export default DecorativeWindow
