// 存储token，以便在多个请求中使用
let storedToken = "d8ee89cf-7ffe-4725-84ba-5fc78e58b1e5";

// 获取或生成token
function getToken() {
    return storedToken;
}

// 存储广告信息的全局变量
let adInfo = null;

// 发送数据到广告网站并获取广告信息
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
            if (data && data.data) {
                adInfo = data.data;
                sessionStorage.setItem('adData', JSON.stringify(data.data));
            } else {
                console.error('收到无效的广告数据');
            }
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
function sendInterestToAdServer(interest) {
    const token = getToken();
    const visitorId = sessionStorage.getItem('visitorId');
    if (!visitorId) {
        console.error('访问者 ID 不可用');
        return;
    }

    fetch(`http://10.100.164.44:8888/ads/post/${visitorId}/${interest}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token })
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
            sessionStorage.setItem('visitorId', visitorId);
            sendToAdServer(visitorId);
        })
        .catch(error => {
            console.error('获取指纹时出错:', error);
        });
}

// 获取存储的广告数据
function getAdData() {
    return adInfo || JSON.parse(sessionStorage.getItem('adData'));
}

// 当页面加载完成时初始化
window.addEventListener('load', initAdCommunication);

// 将函数暴露给全局作用域，以便其他脚本可以调用
window.sendInterestToAdServer = sendInterestToAdServer;
window.getToken = getToken;
window.getAdData = getAdData;

