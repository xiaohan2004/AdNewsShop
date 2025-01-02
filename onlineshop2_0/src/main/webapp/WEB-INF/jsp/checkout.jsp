<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - Online Shop</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
<header>
    <h1>Checkout</h1>
    <nav>
        <ul>
            <li><a href="${pageContext.request.contextPath}/">Home</a></li>
            <li><a href="${pageContext.request.contextPath}/cart">Back to Cart</a></li>
        </ul>
    </nav>
</header>

<main>
    <section class="checkout-form">
        <h2>Order Summary</h2>
        <table>
            <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach var="item" items="${cart}">
                <tr>
                    <td>${item.product.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.product.price * item.quantity}</td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
        <p>Total: $${cart.stream().map(item -> item.product.price * item.quantity).sum()}</p>

        <h2>Shipping Information</h2>
        <form action="${pageContext.request.contextPath}/checkout" method="post">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="address">Address:</label>
            <input type="text" id="address" name="address" required>

            <label for="city">City:</label>
            <input type="text" id="city" name="city" required>

            <label for="zip">ZIP Code:</label>
            <input type="text" id="zip" name="zip" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <button type="submit">Place Order</button>
        </form>
    </section>

    <section class="ad-space">
        <!-- Add your ad space here -->
        <div id="ad-container"></div>
    </section>
</main>

<footer>
    <p>&copy; 2024 Online Shop. All rights reserved.</p>
</footer>

<script src="${pageContext.request.contextPath}/js/main.js"></script>
<script src="${pageContext.request.contextPath}/js/adIntegration.js"></script>
</body>
</html>

