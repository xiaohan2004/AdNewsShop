<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>管理员面板 - 新闻列表</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/list.css">
</head>
<body>
<header>
    <h1>管理员面板 - 新闻列表</h1>
</header>
<main>
    <a href="${pageContext.request.contextPath}/admin/edit">添加新闻</a>
    <table>
        <thead>
        <tr>
            <th>编号</th>
            <th>标题</th>
            <th>类别</th>
            <th>发布时间</th>
            <th>操作</th>
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

