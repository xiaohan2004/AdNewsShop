<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>News Website</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/news.css">
</head>
<body>
<header>
    <h1>新闻网站</h1>
    <nav>
        <ul>
            <li><a href="${pageContext.request.contextPath}/news">主界面</a></li>
            <c:forEach var="cat" items="${categories}">
                <li><a href="${pageContext.request.contextPath}/news?category=${cat}">${cat}</a></li>
            </c:forEach>
        </ul>
    </nav>
    <form action="${pageContext.request.contextPath}/news" method="get" class="search-form">
        <input type="hidden" name="action" value="search">
        <input type="text" name="keyword" placeholder="搜索新闻..." required>
        <button type="submit">搜索</button>
    </form>
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
        <img class="logo" src="logo.png" alt="logo">
        <div class="marquee"><span>滚动字幕广告</span></div>
        <div class="popup">弹出小窗口广告</div>
        <img class="floating-img" src="floating-img.png" alt="浮动图片">
        <div class="floating-text">浮动文字广告</div>
    </div>
</div>

    <div id="news-list" class="news-list">
        <div class="search-result">
        <c:if test="${not empty category}">
            <h2>类别: ${category}</h2>
        </c:if>
        <c:if test="${not empty keyword}">
            <h2>搜索结果: ${keyword}</h2>
        </c:if>
     </div>
        <c:forEach var="news" items="${newsList}">
            <article>
                <h2><a href="${pageContext.request.contextPath}/news?action=view&id=${news.id}">${news.title}</a></h2>
                <p>类别: ${news.category}</p>
                <p>发布时间: ${news.publishDate}</p>
            </article>
        </c:forEach>
    </div>
    <div class="pagination">
        <c:if test="${currentPage > 1}">
            <a href="${pageContext.request.contextPath}/news?page=${currentPage - 1}${not empty category? '&category='.concat(category) : ''}${not empty keyword? '&action=search&keyword='.concat(keyword) : ''}" class="page-link">Previous</a>
        </c:if>
        <c:forEach begin="1" end="${totalPages}" var="i">
            <c:choose>
                <c:when test="${currentPage eq i}">
                    <span class="current-page">${i}</span>
                </c:when>
                <c:otherwise>
                    <a href="${pageContext.request.contextPath}/news?page=${i}${not empty category? '&category='.concat(category) : ''}${not empty keyword? '&action=search&keyword='.concat(keyword) : ''}" class="page-link">${i}</a>
                </c:otherwise>
            </c:choose>
        </c:forEach>
        <c:if test="${currentPage < totalPages}">
            <a href="${pageContext.request.contextPath}/news?page=${currentPage + 1}${not empty category? '&category='.concat(category) : ''}${not empty keyword? '&action=search&keyword='.concat(keyword) : ''}" class="page-link">Next</a>
        </c:if>
    </div>

    
</main>

<footer>
    <p>&copy; 2024 News Website. All rights reserved.</p>
</footer>

<script src="${pageContext.request.contextPath}/js/news.js"></script>
</body>
</html>
