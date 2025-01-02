<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品列表 - 在线商店</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
    <script src="${pageContext.request.contextPath}/js/adIntegration.js"></script>
    <script src="${pageContext.request.contextPath}/js/adDisplay.js"></script>
</head>
<body>
<header>
    <h1>我们的商品</h1>
    <nav class="main-nav">
        <ul>
            <li><a href="${pageContext.request.contextPath}/">首页</a></li>
            <li><a href="${pageContext.request.contextPath}/products" class="active">商品列表</a></li>
            <li><a href="${pageContext.request.contextPath}/cart">购物车</a></li>
        </ul>
    </nav>
</header>

<main>
    <section class="search-filter">
        <form action="${pageContext.request.contextPath}/products" method="get" id="searchForm">
            <input type="text" name="keyword" placeholder="搜索商品..." value="${keyword}">
            <button type="submit">搜索</button>
        </form>
        <div id="banner-ad-container"></div>
        <div class="category-filter">
            <a href="${pageContext.request.contextPath}/products" class="${empty selectedCategory ? 'active' : ''}">全部</a>
            <c:forEach var="cat" items="${categories}">
                <a href="${pageContext.request.contextPath}/products?category=${cat}" class="${cat eq selectedCategory ? 'active' : ''}">${cat}</a>
            </c:forEach>
        </div>
    </section>

    <section class="product-list">
        <c:forEach var="product" items="${products}">
            <div class="product-card">
                <a href="${pageContext.request.contextPath}/product?id=${product.id}" class="product-link">
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">￥${product.price}</p>
                    <p class="category">类别: ${product.category}</p>
                </a>
                <form action="${pageContext.request.contextPath}/cart" method="post" target="hidden-iframe">
                    <form action="${pageContext.request.contextPath}/cart" method="post" class="add-to-cart-form">
                        <input type="hidden" name="productId" value="${product.id}">
                        <input type="hidden" name="action" value="add">
                        <input type="hidden" name="category" value="${product.category}">
                        <button type="submit" onclick="sendInterestToAdServer('${product.category}')">加入购物车</button>
                    </form>
            </div>
        </c:forEach>
    </section>

    <aside id="cart-message" class="cart-message" style="display: none;">
        <div class="success-message">商品已成功加入购物车！</div>
    </aside>
    <section class="ad-space">
        <div id="ad-container"></div>
    </section>
</main>

<footer>
    <p>&copy; 2023 在线商店。保留所有权利。</p>
</footer>

<iframe name="hidden-iframe" style="display:none;"></iframe>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const forms = document.querySelectorAll('form[target="hidden-iframe"]');
        const cartMessage = document.getElementById('cart-message');

        forms.forEach(form => {
            form.addEventListener('submit', function() {
                cartMessage.style.display = 'block';
                setTimeout(() => {
                    cartMessage.style.display = 'none';
                }, 3000);
            });
        });
    });
</script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const addToCartForms = document.querySelectorAll('.add-to-cart-form');
        addToCartForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const category = this.querySelector('input[name="category"]').value;
                sendInterestToAdServer(category);
                this.submit();
            });
        });
    });
</script>
</body>
</html>