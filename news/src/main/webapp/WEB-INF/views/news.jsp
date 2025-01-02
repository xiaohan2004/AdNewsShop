<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>新闻网站</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/news.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
<header>
    <div class="container">
        <h1>新闻网站</h1>
    </div>
</header>

<nav>
    <div class="container">
        <ul>
            <li><a href="${pageContext.request.contextPath}/news">首页</a></li>
            <li><a href="${pageContext.request.contextPath}/news?category=美食">美食</a></li>
            <li><a href="${pageContext.request.contextPath}/news?category=生活">生活</a></li>
            <li><a href="${pageContext.request.contextPath}/news?category=NYT > Technology">科技</a></li>
            <li><a href="${pageContext.request.contextPath}/news?category=体育">体育</a></li>
            <li><a href="${pageContext.request.contextPath}/news?category=人物">人物</a></li>
            <li><a href="${pageContext.request.contextPath}/news?category=NYT > World News">国际</a></li>
            <li><a href="${pageContext.request.contextPath}/news?category=时尚">时尚</a></li>
            <li><a href="${pageContext.request.contextPath}/news?category=游戏">游戏</a></li>
            <li><a href="${pageContext.request.contextPath}/news?category=课程">课程</a></li>
        </ul>
    </div>
</nav>

<div class="container">
    <form action="${pageContext.request.contextPath}/news" method="get" class="search-form">
        <input type="hidden" name="action" value="search">
        <input type="text" name="keyword" placeholder="搜索新闻..." required>
        <button type="submit">搜索</button>
    </form>

    <!-- BANNER 广告位置 -->
    <div id="banner-ad-container" class="banner-ad"></div>

    <main>
        <section id="news-list">
            <c:if test="${not empty category}">
                <h2>分类: ${category}</h2>
            </c:if>
            <c:if test="${not empty keyword}">
                <h2>搜索结果: ${keyword}</h2>
            </c:if>
            <c:forEach var="news" items="${newsList}">
                <article>
                    <h2><a href="${pageContext.request.contextPath}/news?action=view&id=${news.id}">${news.title}</a></h2>
                    <p>分类: ${news.category}</p>
                    <p>发布时间: ${news.publishDate}</p>
                </article>
            </c:forEach>
        </section>

        <aside id="ad-space">
            <!-- 广告空间 -->
            <div id="ad-container"></div>
        </aside>
    </main>

    <div class="pagination">
        <c:if test="${currentPage > 1}">
            <a href="${pageContext.request.contextPath}/news?page=${currentPage - 1}${not empty category ? '&category='.concat(category) : ''}${not empty keyword ? '&action=search&keyword='.concat(keyword) : ''}" class="page-link">上一页</a>
        </c:if>
        <c:forEach begin="1" end="${totalPages}" var="i">
            <c:choose>
                <c:when test="${currentPage eq i}">
                    <span class="current-page">${i}</span>
                </c:when>
                <c:otherwise>
                    <a href="${pageContext.request.contextPath}/news?page=${i}${not empty category ? '&category='.concat(category) : ''}${not empty keyword ? '&action=search&keyword='.concat(keyword) : ''}" class="page-link">${i}</a>
                </c:otherwise>
            </c:choose>
        </c:forEach>
        <c:if test="${currentPage < totalPages}">
            <a href="${pageContext.request.contextPath}/news?page=${currentPage + 1}${not empty category ? '&category='.concat(category) : ''}${not empty keyword ? '&action=search&keyword='.concat(keyword) : ''}" class="page-link">下一页</a>
        </c:if>
    </div>
</div>

<footer>
    <div class="container">
        <p>&copy; 2024 新闻网站. 保留所有权利.</p>
    </div>
</footer>


<script src="${pageContext.request.contextPath}/js/ads.js"></script>
<script src="${pageContext.request.contextPath}/js/adCommunication.js"></script>
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