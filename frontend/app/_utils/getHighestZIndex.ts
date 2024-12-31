function getHighestZIndex() {
    return Array.from(document.querySelectorAll('body *'))
        .map(a => parseFloat(window.getComputedStyle(a).zIndex))
        .filter(a => !isNaN(a))
        .sort()
        .pop();
}

export default getHighestZIndex()