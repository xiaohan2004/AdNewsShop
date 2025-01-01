<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://jakarta.apache.org/taglibs/standard/permittedTaglibs" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${news.title} - News Website</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/news-details.css">
</head>
<body>
<header>
    <h1>新闻详情</h1>
    <nav>
        <ul>
            <li><a href="${pageContext.request.contextPath}/news">主界面</a></li>
        </ul>
    </nav>
</header>

<main>
    <div id="ads" class="ads">
        <div id="ad1-space" class="ad1-space">
            <div id="banner">banner广告</div>
        </div>
        <div id="ad2-space" class="ad2-space"> 
            <img class="logo" src="logo.png" alt="logo">
            <div class="marquee"><span>滚动字幕广告</span></div>
            <div class="popup">弹出小窗口广告</div>
            <img class="floating-img" src="floating-img.png" alt="浮动图片">
            <div class="floating-text">浮动文字广告</div>
        </div>
        <div id="ad3-space" class="ad3-space"> 
            <img class="logo1" src="logo.png" alt="logo">
            <div class="marquee1"><span>滚动字幕广告</span></div>
            <div class="popup1">弹出小窗口广告</div>
            <img class="floating-img1" src="floating-img.png" alt="浮动图片">
            <div class="floating-text1">浮动文字广告</div>
        </div>
    </div>
    <article>
        <h2>${news.title}</h2>
        <p>类别: ${news.category}</p>
        <p>发布时间: ${news.publishDate}</p>
        <div class="news-content">
            <p>新闻内容：${news.content}</p>
        </div>
    </article>
</main>

<footer>
    <p>&copy; 2024 News Website. All rights reserved.</p>
</footer>

<script src="${pageContext.request.contextPath}/js/news.js"></script>
</body>
</html>

