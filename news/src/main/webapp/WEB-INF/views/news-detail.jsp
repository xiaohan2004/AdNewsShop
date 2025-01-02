<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://jakarta.apache.org/taglibs/standard/permittedTaglibs" prefix="c" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${news.title} - 新闻网站</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/news-detail.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
<header>
    <div class="container">
        <h1>新闻网站</h1>
        <nav>
            <ul>
                <li><a href="${pageContext.request.contextPath}/news">首页</a></li>
            </ul>
        </nav>
    </div>
</header>

<div class="container">
    <main>
        <article>
            <h1>${news.title}</h1>
            <div class="meta-info">
                <p>分类: <span id="newsCategory">${news.category}</span></p>
                <p>发布时间: ${news.publishDate}</p>
            </div>
            <div class="news-content">
                ${news.content}
            </div>
        </article>

        <aside id="ad-space">
            <!-- 广告空间 -->
            <div id="ad-container"></div>
        </aside>
    </main>
</div>

<footer>
    <div class="container">
        <p>&copy; 2024 新闻网站. 保留所有权利.</p>
    </div>
</footer>

<script src="${pageContext.request.contextPath}/js/adCommunication.js"></script>
<script src="${pageContext.request.contextPath}/js/ads.js"></script>
<script>
    // 映射新闻类别到广告兴趣类别
    const categoryToInterestMap = {
        '体育': 'sports',
        '生活': 'lifestyle',
        '游戏': 'games',
        '数字产品': 'digital_products',
        '汽车': 'automotive',
        '旅游': 'travel',
        '娱乐': 'entertainment',
        '美食': 'food',
        '时尚': 'fashion',
        '医疗': 'health'
    };


    // 当页面加载完成时发送用户兴趣
    window.addEventListener('load', function() {
        const newsCategory = document.getElementById('newsCategory').textContent;
        const interest = categoryToInterestMap[newsCategory] || 'lifestyle'; // 默认为 lifestyle
        const visitorId = sessionStorage.getItem('visitorId');

        if (visitorId) {
            window.sendUserInterest(visitorId, interest);
        } else {
            console.error('Visitor ID not found');
        }
    });
</script>
<script>
    // 确保在广告数据加载后显示广告
    window.addEventListener('load', function() {
        if (window.getAdData()) {
            window.loadAd();
        }
    });
</script>
</body>
</html>
