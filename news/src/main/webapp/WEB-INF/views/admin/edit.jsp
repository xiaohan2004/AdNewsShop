<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理员 - ${empty news.id ? '创建' : '编辑'}新闻</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/edit.css">
</head>
<body>
<div class="container">
    <header>
        <h1>管理员控制台</h1>
        <p>新闻${empty news.id ? '创建' : '编辑'}界面</p>
    </header>
    <main>
        <form action="${pageContext.request.contextPath}/admin/${empty news.id ? 'create' : 'update'}" method="post">
            <c:if test="${not empty news.id}">
                <input type="hidden" name="id" value="${news.id}">
            </c:if>
            <div class="form-group">
                <label for="title">标题</label>
                <input type="text" id="title" name="title" value="${news.title}" required>
            </div>
            <div class="form-group">
                <label for="category">类别</label>
                <input type="text" id="category" name="category" value="${news.category}" required>
            </div>
            <div class="form-group">
                <label for="content">内容</label>
                <textarea id="content" name="content" required>${news.content}</textarea>
            </div>
            <div class="form-group">
                <label for="publishDate">发布时间</label>
                <fmt:formatDate value="${news.publishDate}" pattern="yyyy-MM-dd'T'HH:mm" var="formattedDate"/>
                <input type="datetime-local" id="publishDate" name="publishDate" value="${formattedDate}" required>
            </div>
            <div class="form-group">
                <button type="submit" class="btn-primary">${empty news.id ? '创建' : '更新'}新闻</button>
                <a href="${pageContext.request.contextPath}/admin/list" class="btn-secondary">返回列表</a>
            </div>
        </form>
    </main>
</div>
<footer>
    <p>&copy; 2024 新闻管理系统. 保留所有权利.</p>
</footer>
</body>
</html>

