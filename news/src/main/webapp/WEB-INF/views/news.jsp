<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>News Website</title>
</head>
<body>
<header>
    <h1>News Website</h1>
    <nav>
        <ul>
            <li><a href="${pageContext.request.contextPath}/news">Home</a></li>
            <c:forEach var="cat" items="${categories}">
                <li><a href="${pageContext.request.contextPath}/news?category=${cat}">${cat}</a></li>
            </c:forEach>
        </ul>
    </nav>
    <form action="${pageContext.request.contextPath}/news" method="get">
        <input type="hidden" name="action" value="search">
        <input type="text" name="keyword" placeholder="Search news..." required>
        <button type="submit">Search</button>
    </form>
</header>

<main>
    <section>
        <c:if test="${not empty category}">
            <h2>Category: ${category}</h2>
        </c:if>
        <c:if test="${not empty keyword}">
            <h2>Search results for: ${keyword}</h2>
        </c:if>
        <c:forEach var="news" items="${newsList}">
            <article>
                <h2><a href="${pageContext.request.contextPath}/news?action=view&id=${news.id}">${news.title}</a></h2>
                <p>Category: ${news.category}</p>
                <p>Published: ${news.publishDate}</p>
            </article>
        </c:forEach>
    </section>



    <div>
        <c:if test="${currentPage > 1}">
            <a href="${pageContext.request.contextPath}/news?page=${currentPage - 1}${not empty category ? '&category='.concat(category) : ''}${not empty keyword ? '&action=search&keyword='.concat(keyword) : ''}">Previous</a>
        </c:if>
        <c:forEach begin="1" end="${totalPages}" var="i">
            <c:choose>
                <c:when test="${currentPage eq i}">
                    <span>${i}</span>
                </c:when>
                <c:otherwise>
                    <a href="${pageContext.request.contextPath}/news?page=${i}${not empty category ? '&category='.concat(category) : ''}${not empty keyword ? '&action=search&keyword='.concat(keyword) : ''}" >${i}</a>
                </c:otherwise>
            </c:choose>
        </c:forEach>
        <c:if test="${currentPage < totalPages}">
            <a href="${pageContext.request.contextPath}/news?page=${currentPage + 1}${not empty category ? '&category='.concat(category) : ''}${not empty keyword ? '&action=search&keyword='.concat(keyword) : ''}" >Next</a>
        </c:if>
    </div>

</main>

<footer>
    <p>&copy; 2024 News Website. All rights reserved.</p>
</footer>

</body>
</html>
