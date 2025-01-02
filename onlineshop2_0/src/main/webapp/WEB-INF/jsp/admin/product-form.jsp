<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${empty product ? '添加商品' : '编辑商品'} - 在线商店</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/admin.css">
</head>
<body>
<header>
    <h1>${empty product ? '添加商品' : '编辑商品'}</h1>
    <nav class="main-nav">
        <ul>
            <li><a href="${pageContext.request.contextPath}/">首页</a></li>
            <li><a href="${pageContext.request.contextPath}/admin">商品管理</a></li>
        </ul>
    </nav>
</header>

<main class="admin-page">
    <section class="product-form">
        <h2>${empty product ? '添加新商品' : '编辑商品'}</h2>
        <form action="${pageContext.request.contextPath}/admin" method="post">
            <input type="hidden" name="action" value="${empty product ? 'add' : 'edit'}">
            <c:if test="${not empty product}">
                <input type="hidden" name="id" value="${product.id}">
            </c:if>
            <div class="form-group">
                <label for="name">商品名称:</label>
                <input type="text" id="name" name="name" value="${product.name}" required>
            </div>
            <div class="form-group">
                <label for="category">类别:</label>
                <input type="text" id="category" name="category" value="${product.category}" required>
            </div>
            <div class="form-group">
                <label for="price">价格:</label>
                <input type="number" id="price" name="price" value="${product.price}" step="0.01" min="0" required>
            </div>
            <div class="form-group">
                <label for="imageUrl">图片URL:</label>
                <input type="url" id="imageUrl" name="imageUrl" value="${product.imageUrl}" required>
            </div>
            <div class="form-group">
                <label for="description">描述:</label>
                <textarea id="description" name="description" rows="4" required>${product.description}</textarea>
            </div>
            <button type="submit" class="submit-button">${empty product ? '添加商品' : '更新商品'}</button>
        </form>
    </section>
</main>

<footer>
    <p>&copy; 2024 在线商店。保留所有权利。</p>
</footer>
</body>
</html>

