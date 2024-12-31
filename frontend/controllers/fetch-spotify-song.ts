interface IResponse {
    preview_url: string;
}

const fetchMusic = async () => {
    let cachedResponse: Promise<IResponse> | null = null;
    async function getMusic() {
        if (cachedResponse) {
            return cachedResponse;
        }
        const _music = await fetch(`https://api.spotify.com/v1/tracks/${process.env.SPOTIFY_TRACK_ID}`, {
            headers: {
                'Authorization': `Bearer ${process.env.SPOTIFY_CLIENT_SECRET}`
            }
        })
        const music = _music.json();
        cachedResponse = music;
        return music;
    }
    return getMusic();
};

export default fetchMusic