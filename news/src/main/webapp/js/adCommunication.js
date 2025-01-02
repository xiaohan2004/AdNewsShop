// 存储token，以便在多个请求中使用
let storedToken = "d8ee89cf-7ffe-4725-84ba-5fc78e58b1e5";

// 获取或生成token
function getToken() {
    return storedToken;
}

// 发送数据到广告网站
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
            console.log('成功:', data);
            // 存储广告数据到 sessionStorage
            if (data && data.data) {
                sessionStorage.setItem('adData', JSON.stringify(data.data));
            } else {
                console.error('收到无效的广告数据');
            }
            // 触发广告加载
            if (typeof window.loadAd === 'function') {
                window.loadAd();
            } else {
                console.error('loadAd 函数未定义');
            }
        })
        .catch((error) => {
            console.error('错误:', error);
        });
}

// 发送用户兴趣到广告网站
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
            console.log('兴趣发送成功:', data);
        })
        .catch((error) => {
            console.error('发送兴趣时出错:', error);
        });
}

// 初始化函数
function initAdCommunication() {
    const fpPromise = import('http://10.100.164.44:8888/js/fp.js')
        .then(FPJS => FPJS.load());

    fpPromise
        .then(fp => fp.get())
        .then(result => {
            const visitorId = result.visitorId;
            console.log('访问者 ID:', visitorId);
            sendToAdServer(visitorId);

            // 存储visitorId到sessionStorage，以便在其他页面使用
            sessionStorage.setItem('visitorId', visitorId);
        })
        .catch(error => {
            console.error('获取指纹时出错:', error);
        });
}

// 当页面加载完成时初始化
window.addEventListener('load', initAdCommunication);

// 暴露函数以供其他脚本使用
window.sendUserInterest = sendUserInterest;
window.getToken = getToken;

// 获取存储的广告数据
function getAdData() {
    const adDataString = sessionStorage.getItem('adData');
    return adDataString ? JSON.parse(adDataString) : null;
}

// 暴露函数以供其他脚本使用
window.getAdData = getAdData;

