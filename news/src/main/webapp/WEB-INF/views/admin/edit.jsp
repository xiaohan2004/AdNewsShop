<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admin - Edit News</title>
</head>
<body>
<header>
    <h1>Admin - Edit News</h1>
</header>
<main>
    <form action="${pageContext.request.contextPath}/admin/${empty news.id ? 'create' : 'update'}" method="post">
        <c:if test="${not empty news.id}">
            <input type="hidden" name="id" value="${news.id}">
        </c:if>
        <div>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" value="${news.title}" required>
        </div>
        <div>
            <label for="content">Content:</label>
            <textarea id="content" name="content" required>${news.content}</textarea>
        </div>
        <div>
            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value="${news.category}" required>
        </div>
        <div>
            <label for="publishDate">Publish Date:</label>
            <input type="datetime-local" id="publishDate" name="publishDate" value="${not empty news.publishDate ? news.publishDate.toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDateTime() : ''}" required>
        </div>
        <div>
            <input type="submit" value="${empty news.id ? 'Create' : 'Update'} News">
        </div>
    </form>
</main>
</body>
</html>

