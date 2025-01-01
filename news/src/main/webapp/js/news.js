document.addEventListener('DOMContentLoaded', function () {
    const ad2Types = ['logo', 'marquee', 'popup', 'floating-img', 'floating-text'];
    const ad3Types = ['logo', 'marquee', 'popup', 'floating-img', 'floating-text'];

    const ad2Space = document.getElementById('ad2-space');
    const ad3Space = document.getElementById('ad3-space');

    // 随机生成ad2
    const ad2Index = Math.floor(Math.random() * ad2Types.length);
    const ad2Type = ad2Types[ad2Index];
    ad2Space.innerHTML = '';
    if (ad2Type === 'logo') {
        const logo = document.createElement('img');
        logo.src = 'logo.png';
        logo.alt = 'logo';
        const logos = ad2Space.querySelectorAll('.logo');
        if (logos.length > 0) {
            ad2Space.appendChild(logos[0]);
        } else {
            ad2Space.appendChild(logo);
        }
    } else if (ad2Type === 'marquee') {
        const marqueeDiv = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = '这是滚动字幕广告';
        marqueeDiv.appendChild(span);
        const marquees = ad2Space.querySelectorAll('.marquee');
        if (marquees.length > 0) {
            ad2Space.appendChild(marquees[0]);
        } else {
            ad2Space.appendChild(marqueeDiv);
        }
    } else if (ad2Type === 'popup') {
        const popup = document.createElement('div');
        popup.textContent = '这是弹出小窗口广告';
        const popups = ad2Space.querySelectorAll('.popup');
        if (popups.length > 0) {
            ad2Space.appendChild(popups[0]);
        } else {
            ad2Space.appendChild(popup);
        }
    } else if (ad2Type === 'floating-img') {
        const floatingImg = document.createElement('img');
        floatingImg.src = 'floating-img.png';
        floatingImg.alt = '浮动图片';
        const floatingImgs = ad2Space.querySelectorAll('.floating-img');
        if (floatingImgs.length > 0) {
            ad2Space.appendChild(floatingImgs[0]);
        } else {
            ad2Space.appendChild(floatingImg);
        }
    } else if (ad2Type === 'floating-text') {
        const floatingText = document.createElement('div');
        floatingText.textContent = '这是浮动文字广告';
        const floatingTexts = ad2Space.querySelectorAll('.floating-text');
        if (floatingTexts.length > 0) {
            ad2Space.appendChild(floatingTexts[0]);
        } else {
            ad2Space.appendChild(floatingText);
        }
    }

    // 随机生成ad3
    const ad3Index = Math.floor(Math.random() * ad3Types.length);
    const ad3Type = ad3Types[ad3Index];
    ad3Space.innerHTML = '';
    if (ad3Type === 'logo') {
        const logo = document.createElement('img');
        logo.src = 'logo.png';
        logo.alt = 'logo';
        const logos = ad3Space.querySelectorAll('.logo');
        if (logos.length > 0) {
            ad3Space.appendChild(logos[0]);
        } else {
            ad3Space.appendChild(logo);
        }
    } else if (ad3Type === 'marquee') {
        const marqueeDiv = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = '这是滚动字幕广告';
        marqueeDiv.appendChild(span);
        const marquees = ad3Space.querySelectorAll('.marquee');
        if (marquees.length > 0) {
            ad3Space.appendChild(marquees[0]);
        } else {
            ad3Space.appendChild(marqueeDiv);
        }
    } else if (ad3Type === 'popup') {
        const popup = document.createElement('div');
        popup.textContent = '这是弹出小窗口广告';
        const popups = ad3Space.querySelectorAll('.popup');
        if (popups.length > 0) {
            ad3Space.appendChild(popups[0]);
        } else {
            ad3Space.appendChild(popup);
        }
    } else if (ad3Type === 'floating-img') {
        const floatingImg = document.createElement('img');
        floatingImg.src = 'floating-img.png';
        floatingImg.alt = '浮动图片';
        const floatingImgs = ad3Space.querySelectorAll('.floating-img');
        if (floatingImgs.length > 0) {
            ad3Space.appendChild(floatingImgs[0]);
        } else {
            ad3Space.appendChild(floatingImg);
        }
    } else if (ad3Type === 'floating-text') {
        const floatingText = document.createElement('div');
        floatingText.textContent = '这是浮动文字广告';
        const floatingTexts = ad3Space.querySelectorAll('.floating-text');
        if (floatingTexts.length > 0) {
            ad3Space.appendChild(floatingTexts[0]);
        } else {
            ad3Space.appendChild(floatingText);
        }
    }
});