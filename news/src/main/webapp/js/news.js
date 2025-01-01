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
        ad2Space.appendChild(logo);
    } else if (ad2Type === 'marquee') {
        const marqueeDiv = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = '这是滚动字幕广告';
        marqueeDiv.appendChild(span);
        ad2Space.appendChild(marqueeDiv);
    } else if (ad2Type === 'popup') {
        const popup = document.createElement('div');
        popup.textContent = '这是弹出小窗口广告';
        ad2Space.appendChild(popup);
    } else if (ad2Type === 'floating-img') {
        const floatingImg = document.createElement('img');
        floatingImg.src = 'floating-img.png';
        floatingImg.alt = '浮动图片';
        ad2Space.appendChild(floatingImg);
    } else if (ad2Type === 'floating-text') {
        const floatingText = document.createElement('div');
        floatingText.textContent = '这是浮动文字广告';
        ad2Space.appendChild(floatingText);
    }

    // 随机生成ad3
    const ad3Index = Math.floor(Math.random() * ad3Types.length);
    const ad3Type = ad3Types[ad3Index];
    ad3Space.innerHTML = '';
    if (ad3Type === 'logo') {
        const logo = document.createElement('img');
        logo.src = 'logo.png';
        logo.alt = 'logo';
        ad3Space.appendChild(logo);
    } else if (ad3Type === 'marquee') {
        const marqueeDiv = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = '这是滚动字幕广告';
        marqueeDiv.appendChild(span);
        ad3Space.appendChild(marqueeDiv);
    } else if (ad3Type === 'popup') {
        const popup = document.createElement('div');
        popup.textContent = '这是弹出小窗口广告';
        ad3Space.appendChild(popup);
    } else if (ad3Type === 'floating-img') {
        const floatingImg = document.createElement('img');
        floatingImg.src = 'floating-img.png';
        floatingImg.alt = '浮动图片';
        ad3Space.appendChild(floatingImg);
    } else if (ad3Type === 'floating-text') {
        const floatingText = document.createElement('div');
        floatingText.textContent = '这是浮动文字广告';
        ad3Space.appendChild(floatingText);
    }
});