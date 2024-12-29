<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admin Panel - News List</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
<header>
    <h1>Admin Panel - News List</h1>
</header>
<main>
    <a href="${pageContext.request.contextPath}/admin/edit">Add New News</a>
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Publish Date</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="news" items="${newsList}">
            <tr>
                <td>${news.id}</td>
                <td>${news.title}</td>
                <td>${news.category}</td>
                <td>${news.publishDate}</td>
                <td>
                    <a href="${pageContext.request.contextPath}/admin/edit?id=${news.id}">Edit</a>
                    <a href="${pageContext.request.contextPath}/admin/delete?id=${news.id}" onclick="return confirm('Are you sure you want to delete this news?')">Delete</a>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</main>
</body>
</html>

