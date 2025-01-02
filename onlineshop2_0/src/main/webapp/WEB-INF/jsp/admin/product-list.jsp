<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品管理 - 在线商店</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/admin.css">
</head>
<body>
<header>
    <h1>商品管理</h1>
    <nav class="main-nav">
        <ul>
            <li><a href="${pageContext.request.contextPath}/">首页</a></li>
            <li><a href="${pageContext.request.contextPath}/admin" class="active">商品管理</a></li>
        </ul>
    </nav>
</header>

<main class="admin-page">
    <section class="admin-actions">
        <a href="${pageContext.request.contextPath}/admin/add" class="add-product-button">添加新商品</a>
    </section>
    <section class="product-list">
        <table class="admin-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>名称</th>
                <th>类别</th>
                <th>价格</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach var="product" items="${products}">
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>￥${product.price}</td>
                    <td>
                        <a href="${pageContext.request.contextPath}/admin/edit/${product.id}" class="edit-button">编辑</a>
                        <form action="${pageContext.request.contextPath}/admin" method="post" style="display:inline;">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="${product.id}">
                            <button type="submit" class="delete-button" onclick="return confirm('确定要删除这个商品吗？')">删除</button>
                        </form>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </section>
</main>

<footer>
    <p>&copy; 2024 在线商店。保留所有权利。</p>
</footer>
</body>
</html>

