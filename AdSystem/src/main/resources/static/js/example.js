// Store token for use across multiple requests
let storedToken = ""; // Use your own token

// Retrieve or generate token
function getToken() {
    return storedToken;
}

// Send data to the ad server
function sendToAdServer(visitorId) {
    const token = getToken();
    const websiteOperator = {
        token: token
    };

    fetch(`http://10.100.164.44:8888/ads/get/${visitorId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(websiteOperator)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Store ad data in sessionStorage
            if (data && data.data) {
                sessionStorage.setItem('adData', JSON.stringify(data.data));
            } else {
                console.error('Received invalid ad data');
            }
            // Trigger ad loading
            if (typeof window.loadAd === 'function') {
                window.loadAd();
            } else {
                console.error('loadAd function is not defined');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Send user interest to the ad server
function sendUserInterest(visitorId, interest) {
    const token = getToken();
    const websiteOperator = {
        token: token
    };

    fetch(`http://10.100.164.44:8888/ads/post/${visitorId}/${interest}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(websiteOperator)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Interest sent successfully:', data);
        })
        .catch((error) => {
            console.error('Error sending interest:', error);
        });
}

// Initialization function
function initAdCommunication() {
    const fpPromise = import('http://10.100.164.44:8888/js/fp.js')
        .then(FPJS => FPJS.load());

    fpPromise
        .then(fp => fp.get())
        .then(result => {
            const visitorId = result.visitorId;
            console.log('Visitor ID:', visitorId);
            sendToAdServer(visitorId);

            // Store visitorId in sessionStorage for use in other pages
            sessionStorage.setItem('visitorId', visitorId);
        })
        .catch(error => {
            console.error('Error obtaining fingerprint:', error);
        });
}

// Initialize when the page has loaded
window.addEventListener('load', initAdCommunication);

// Expose functions for use in other scripts
window.sendUserInterest = sendUserInterest;
window.getToken = getToken;

// Retrieve stored ad data
function getAdData() {
    const adDataString = sessionStorage.getItem('adData');
    return adDataString ? JSON.parse(adDataString) : null;
}

// Expose function for use in other scripts
window.getAdData = getAdData;