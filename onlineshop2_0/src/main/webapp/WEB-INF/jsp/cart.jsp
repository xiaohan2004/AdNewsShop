<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>购物车 - 在线商店</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
<header>
    <h1>您的购物车</h1>
    <nav class="main-nav">
        <ul>
            <li><a href="${pageContext.request.contextPath}/">首页</a></li>
            <li><a href="${pageContext.request.contextPath}/products">商品列表</a></li>
            <li><a href="${pageContext.request.contextPath}/cart" class="active">购物车</a></li>
        </ul>
    </nav>
</header>

<main class="cart-page">
    <section class="cart-items">
        <c:if test="${empty cart}">
            <p class="empty-cart-message">您的购物车是空的。<a href="${pageContext.request.contextPath}/products">去购物</a></p>
        </c:if>
        <c:if test="${not empty cart}">
            <table class="cart-table">
                <thead>
                <tr>
                    <th>商品</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>小计</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach var="entry" items="${cart}">
                    <tr>
                        <td class="product-info">
                            <img src="${entry.value.product.imageUrl}" alt="${entry.value.product.name}" class="product-thumbnail">
                            <span>${entry.value.product.name}</span>
                        </td>
                        <td class="product-price">￥${entry.value.product.price}</td>
                        <td class="product-quantity">
                            <form action="${pageContext.request.contextPath}/cart" method="post" class="quantity-form">
                                <input type="hidden" name="action" value="update">
                                <input type="hidden" name="productId" value="${entry.key}">
                                <button type="submit" name="quantity" value="${entry.value.quantity - 1}" ${entry.value.quantity <= 1 ? 'disabled' : ''}>-</button>
                                <span>${entry.value.quantity}</span>
                                <button type="submit" name="quantity" value="${entry.value.quantity + 1}">+</button>
                            </form>
                        </td>
                        <td class="product-subtotal">￥${entry.value.product.price * entry.value.quantity}</td>
                        <td class="product-remove">
                            <form action="${pageContext.request.contextPath}/cart" method="post">
                                <input type="hidden" name="action" value="remove">
                                <input type="hidden" name="productId" value="${entry.key}">
                                <button type="submit" class="remove-button">删除</button>
                            </form>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <div class="cart-summary">
                <c:set var="total" value="0" />
                <c:forEach var="entry" items="${cart}">
                    <c:set var="total" value="${total + entry.value.product.price * entry.value.quantity}" />
                </c:forEach>
                <p class="cart-total">总计: <span>￥${total}</span></p>
                <form action="${pageContext.request.contextPath}/checkout" method="post">
                    <button type="submit" class="checkout-button">结账</button>
                </form>
            </div>
        </c:if>
    </section>
</main>

<footer>
    <p>&copy; 2024 在线商店。保留所有权利。</p>
</footer>

<script src="${pageContext.request.contextPath}/js/adIntegration.js"></script>
</body>
</html>

