<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>管理员 - 编辑新闻</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/edit.css">
</head>
<body>
<header>
    <h1>管理员 - 编辑新闻</h1>
</header>
<main>
    <form action="${pageContext.request.contextPath}/admin/${empty news.id ? 'create' : 'update'}" method="post">
        <c:if test="${not empty news.id}">
            <input type="hidden" name="id" value="${news.id}">
        </c:if>
        <div>
            <label for="title">标题:</label>
            <input type="text" id="title" name="title" value="${news.title}" required>
        </div>
        <div>
            <label for="content">内容:</label>
            <textarea id="content" name="content" required>${news.content}</textarea>
        </div>
        <div>
            <label for="category">类别:</label>
            <input type="text" id="category" name="category" value="${news.category}" required>
        </div>
        <div>
            <label for="publishDate">发布时间:</label>
            <fmt:formatDate value="${news.publishDate}" pattern="yyyy-MM-dd'T'HH:mm" var="formattedDate"/>
            <input type="datetime-local" id="publishDate" name="publishDate" value="${formattedDate}" required>
        </div>
        <div>
            <input type="submit" value="${empty news.id ? 'Create' : 'Update'} News">
        </div>
    </form>
</main>
</body>
</html>

