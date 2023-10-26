function toggleDisplay(showElementId, hideElementIds) {
    const showElement = document.getElementById(showElementId);

    if (showElement) {
        showElement.style.display = 'block';
    }

    if (Array.isArray(hideElementIds)) {
        hideElementIds.forEach((elementId) => {
            const hideElement = document.getElementById(elementId);

            if (hideElement) {
                hideElement.style.display = 'none';
            }
        });
    }
    window.scrollTo(0, 0);
}

function scrollToTop() {
    window.scrollTo(0, 0);
}