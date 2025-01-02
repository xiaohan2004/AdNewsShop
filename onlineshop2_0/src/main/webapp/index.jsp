<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>欢迎 - 在线商店</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
    <script src="${pageContext.request.contextPath}/js/adDisplay.js"></script>
</head>
<body>
<header>
    <h1>欢迎来到我们的在线商店</h1>
    <nav class="main-nav">
        <ul>
            <li><a href="${pageContext.request.contextPath}/" class="active">首页</a></li>
            <li><a href="${pageContext.request.contextPath}/products">商品列表</a></li>
            <li><a href="${pageContext.request.contextPath}/cart">购物车</a></li>
        </ul>
    </nav>
</header>
<div id="banner-ad-container"></div>
<main>
    <section class="featured-products">
        <h2>精选商品</h2>
        <!-- 在这里添加一些精选商品 -->
    </section>

    <section class="ad-space">
        <div id="ad-container"></div>
    </section>
</main>

<footer>
    <p>&copy; 2024 在线商店。保留所有权利。</p>
</footer>
<script src="${pageContext.request.contextPath}/js/adIntegration.js"></script>
<script src="${pageContext.request.contextPath}/js/main.js"></script>
</body>
</html>

