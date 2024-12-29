<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://jakarta.apache.org/taglibs/standard/permittedTaglibs" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${news.title} - News Website</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
<header>
    <h1>News Website</h1>
    <nav>
        <ul>
            <li><a href="${pageContext.request.contextPath}/news">Home</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h1>${news.title}</h1>
        <p>Category: ${news.category}</p>
        <p>Published: ${news.publishDate}</p>
        <div class="news-content">
            ${news.content}
        </div>
    </article>

    <aside id="ad-space">
        <!-- Ad space -->
        <div id="ad-container"></div>
    </aside>
</main>

<footer>
    <p>&copy; 2024 News Website. All rights reserved.</p>
</footer>

<script src="${pageContext.request.contextPath}/js/ads.js"></script>
</body>
</html>

