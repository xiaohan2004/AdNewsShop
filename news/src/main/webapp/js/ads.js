// Function to load and display a random ad
function loadRandomAd() {
    // Simulating an API call to get ad data
    const ads = [
        { type: 'banner', content: '<img src="path/to/banner1.jpg" alt="Ad Banner 1">' },
        { type: 'text', content: '<p>Special offer! Click here for more details.</p>' },
        { type: 'popup', content: '<div class="popup">New product launch! Check it out now.</div>' }
    ];

    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    const adContainer = document.getElementById('ad-container');
    adContainer.innerHTML = randomAd.content;

    if (randomAd.type === 'popup') {
        setTimeout(() => {
            adContainer.querySelector('.popup').style.display = 'block';
        }, 3000);
    }
}

// Load a random ad when the page loads
window.addEventListener('load', loadRandomAd);

// Refresh ad every 30 seconds
setInterval(loadRandomAd, 30000);

