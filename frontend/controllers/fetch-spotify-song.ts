// This file is deprecated. Use the new Spotify API at /api/spotify/currently-playing
// This file is kept for backward compatibility but should not be used in new code.

interface IResponse {
  preview_url: string
}

async function fetchMusic() {
  // Redirect to new API
  try {
    const response = await fetch('/api/spotify/currently-playing')
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error('Error fetching Spotify data:', error)
    return null
  }
}

export default fetchMusic
