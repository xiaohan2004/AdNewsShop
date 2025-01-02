// 定义广告类型
const adTypes = ['logo', 'banner', 'scrollingText', 'popup', 'floatingAd', 'largeInsert', 'sidebarAd'];

// 随机选择广告类型
function getRandomAdType() {
    const pageWidth = window.innerWidth;
    if (pageWidth <= 768) {
        // 在移动设备上，不使用浮动广告和弹出广告
        return adTypes.filter(type => type !== 'floatingAd' && type !== 'popup')[Math.floor(Math.random() * 5)];
    }
    return adTypes[Math.floor(Math.random() * adTypes.length)];
}

// 加载并显示广告
function loadAd() {
    const adData = window.getAdData();
    if (!adData) {
        console.error('没有可用的广告数据');
        return;
    }

    const adContainer = document.getElementById('ad-container');
    const bannerAdContainer = document.getElementById('banner-ad-container');
    if (!adContainer && !bannerAdContainer) {
        console.error('未找到广告容器');
        return;
    }

    const { id, title, content, imageUrl } = adData;
    const token = window.getToken(); // 获取token
    const adUrl = `http://10.100.164.44:8888/ads/${id}/${token}`;
    const randomAdType = getRandomAdType();

    let adHtml = '';
    switch (randomAdType) {
        case 'logo':
            adHtml = `<a href="${adUrl}" target="_blank" class="logo-ad"><img src="${imageUrl}" alt="${title}" style="max-width:100px; height:auto;"></a>`;
            break;
        case 'banner':
            adHtml = `<a href="${adUrl}" target="_blank" class="banner-ad"><img src="${imageUrl}" alt="${title}" style="width:100%; max-height:100px;"></a>`;
            break;
        case 'scrollingText':
            adHtml = `<div class="scrolling-text"><a href="${adUrl}" target="_blank">${content}</a></div>`;
            break;
        case 'popup':
            adHtml = `
                <div class="popup-ad" id="popupAd"><div class="popup-ad" id="popupAd">
                    <button onclick="closePopupAd()" class="close-btn">&times;</button>
                    <a href="${adUrl}" target="_blank">
                        <img src="${imageUrl}" alt="${title}" style="max-width:200px; height:auto;">
                        <p>${content}</p>
                    </a>
                </div>
            `;
            break;
        case 'floatingAd':
            adHtml = `
                <div class="floating-ad" id="floatingAd">
                    <a href="${adUrl}" target="_blank">
                        <img src="${imageUrl}" alt="${title}" style="max-width:100px; height:auto;">
                    </a>
                </div>
            `;
            break;
        case 'largeInsert':
            adHtml = `
                <div class="large-insert-ad">
                    <a href="${adUrl}" target="_blank">
                        <img src="${imageUrl}" alt="${title}" style="width:100%; max-height:300px;">
                        <h3>${title}</h3>
                        <p>${content}</p>
                    </a>
                </div>
            `;
            break;
        case 'sidebarAd':
            adHtml = `
                <div class="sidebar-ad">
                    <a href="${adUrl}" target="_blank">
                        <img src="${imageUrl}" alt="${title}" style="width:100%; max-height:250px;">
                        <h4>${title}</h4>
                    </a>
                </div>
            `;
            break;
    }

    if (randomAdType === 'banner' && bannerAdContainer) {
        bannerAdContainer.innerHTML = adHtml;
    } else if (adContainer) {
        adContainer.innerHTML = adHtml;
    }

    // 为特定广告类型添加额外的处理
    if (randomAdType === 'scrollingText') {
        const container = randomAdType === 'banner' ? bannerAdContainer : adContainer;
        container.style.overflow = 'hidden';
        container.style.whiteSpace = 'nowrap';
        const scrollingElement = container.querySelector('.scrolling-text');
        scrollingElement.style.display = 'inline-block';
        scrollingElement.style.paddingLeft = '100%';
        scrollingElement.style.animation = 'scroll-left 20s linear infinite';
    } else if (randomAdType === 'popup') {
        setTimeout(() => {
            document.getElementById('popupAd').style.display = 'block';
        }, 3000);
    } else if (randomAdType === 'floatingAd') {
        const floatingAd = document.getElementById('floatingAd');
        let position = 20;
        setInterval(() => {
            position += 1;
            floatingAd.style.bottom = `${position % 100}px`;
        }, 50);
    }

    // 在控制台输出 id、imageUrl 和选择的广告类型
    console.log('广告 ID:', id);
    console.log('图片 URL:', imageUrl);
    console.log('选择的广告类型:', randomAdType);
}

// 关闭弹出广告的函数
function closePopupAd() {
    const popupAd = document.getElementById('popupAd');
    if (popupAd) {
        popupAd.style.display = 'none';
    }
}

// 暴露函数以供其他脚本使用
window.loadAd = loadAd;
window.closePopupAd = closePopupAd;

// 当页面加载完成时加载广告
window.addEventListener('load', function() {
    if (typeof window.loadAd === 'function') {
        window.loadAd();
    } else {
        console.error('loadAd 函数未定义');
    }
});

