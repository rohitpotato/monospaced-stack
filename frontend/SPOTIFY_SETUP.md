# Spotify API Setup Guide

This guide will help you set up the Spotify API integration for displaying your currently playing track.

## Prerequisites

1. A Spotify account
2. A Spotify Developer account (free)

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - **App name**: Your app name (e.g., "My Personal Website")
   - **App description**: Brief description
   - **Website**: Your website URL
   - **Redirect URI**: `http://localhost:3000/api/spotify/callback` (for development)
5. Click "Save"

## Step 2: Get Your Credentials

1. In your app dashboard, click on your app
2. Note down:
   - **Client ID** (visible on the app overview)
   - **Client Secret** (click "Show client secret")

## Step 3: Get Authorization Code

1. Go to the following URL (replace `YOUR_CLIENT_ID` with your actual Client ID):
   ```
   https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/api/spotify/callback&scope=user-read-currently-playing%20user-read-playback-state
   ```

2. Log in to Spotify and authorize the app
3. You'll be redirected to a URL with a `code` parameter
4. Copy the `code` value from the URL

## Step 4: Exchange Code for Refresh Token

1. Create a temporary script or use a tool like Postman to make a POST request:

   **URL**: `https://accounts.spotify.com/api/token`
   
   **Headers**:
   ```
   Content-Type: application/x-www-form-urlencoded
   Authorization: Basic BASE64(CLIENT_ID:CLIENT_SECRET)
   ```
   
   **Body**:
   ```
   grant_type=authorization_code&code=YOUR_CODE&redirect_uri=http://localhost:3000/api/spotify/callback
   ```

2. The response will contain a `refresh_token` - save this!

## Step 5: Set Environment Variables

Add these to your `.env.local` file in the frontend directory:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Play a song on Spotify
3. Visit your website - you should see the currently playing track in the decorative window!

## Troubleshooting

### "Failed to refresh Spotify token"
- Check that your environment variables are set correctly
- Ensure your refresh token is valid (they don't expire but can be revoked)

### "No music detected" or "Nothing Playing"
- Make sure you have music playing on Spotify
- Check that your Spotify account has the necessary permissions
- Verify that the scope includes `user-read-currently-playing`

### CORS Issues
- The API route handles CORS automatically
- If you're still having issues, check your Next.js configuration

## Security Notes

- Never commit your `.env.local` file to version control
- The refresh token provides access to your Spotify account - keep it secure
- Consider using a more secure token storage solution for production

## Features

- ✅ Real-time currently playing track display
- ✅ Automatic token refresh
- ✅ Error handling and fallback states
- ✅ Loading states with skeleton UI
- ✅ Responsive design
- ✅ Truncation for long track/artist names
