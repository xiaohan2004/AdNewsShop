<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} - 商品详情</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
    <script src="${pageContext.request.contextPath}/js/adIntegration.js"></script>
    <script src="${pageContext.request.contextPath}/js/adDisplay.js"></script>
</head>
<body>
<header>
    <h1>商品详情</h1>
    <nav class="main-nav">
        <ul>
            <li><a href="${pageContext.request.contextPath}/">首页</a></li>
            <li><a href="${pageContext.request.contextPath}/products">商品列表</a></li>
            <li><a href="${pageContext.request.contextPath}/cart">购物车</a></li>
        </ul>
    </nav>
</header>
<div id="banner-ad-container"></div>
<main>
    <div class="product-detail">
        <div class="product-image">
            <img src="${product.imageUrl}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h2>${product.name}</h2>
            <p class="price">￥${product.price}</p>
            <p class="category">类别: ${product.category}</p>
            <p class="description">${product.description}</p>

                <form action="${pageContext.request.contextPath}/cart" method="post" class="add-to-cart-form">
                    <input type="hidden" name="productId" value="${product.id}">
                    <input type="hidden" name="action" value="add">
                    <input type="hidden" name="category" value="${product.category}">
                    <label for="quantity">数量:</label>
                    <input type="number" id="quantity" name="quantity" value="1" min="1" max="10">
                    <button type="submit">加入购物车</button>
                </form>
                <form action="${pageContext.request.contextPath}/cart" method="post" class="buy-now-form">
                    <input type="hidden" name="productId" value="${product.id}">
                    <input type="hidden" name="action" value="buy_now">
                    <input type="hidden" name="quantity" value="1">
                    <button type="submit" class="buy-now-button">立即购买</button>
                </form>

        </div>
    </div>

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
        const addToCartForm = document.querySelector('.add-to-cart-form');
        const cartMessage = document.getElementById('cart-message');
        const quantityInput = document.getElementById('quantity');
        const buyNowButton = document.querySelector('.buy-now-button');

        addToCartForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const category = this.querySelector('input[name="category"]').value;
            sendInterestToAdServer(category);
            const formData = new FormData(this);
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        cartMessage.style.display = 'block';
                        setTimeout(() => {
                            cartMessage.style.display = 'none';
                        }, 3000);
                        if (data.category) {
                            sendInterestToAdServer(data.category);
                        }
                    } else {
                        console.error('Failed to add product to cart');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

        buyNowButton.addEventListener('click', function(e) {
            e.preventDefault();
            const quantity = quantityInput.value;
            this.form.querySelector('input[name="quantity"]').value = quantity;
            const category = addToCartForm.querySelector('input[name="category"]').value;
            sendInterestToAdServer(category);
            this.form.submit();
        });

        // 发送兴趣数据
        sendInterestToAdServer('${product.category}');
    });
</script>
</body>
</html>