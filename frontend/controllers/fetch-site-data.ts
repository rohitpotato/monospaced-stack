const fetchSiteData = () => {
    return fetch('', {
        cache: 'force-cache'
    })
}

export default fetchSiteData;