package com.example.onlineshop2_0.servlet;



import com.example.onlineshop2_0.model.CartItem;
import com.example.onlineshop2_0.model.Product;
import com.example.onlineshop2_0.service.ProductService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {
    private ProductService productService = new ProductService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        Map<Integer, CartItem> cart = (Map<Integer, CartItem>) session.getAttribute("cart");
        if (cart == null) {
            cart = new HashMap<>();
        }
        request.setAttribute("cart", cart);
        request.getRequestDispatcher("/WEB-INF/jsp/cart.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        String productIdStr = request.getParameter("productId");

        if (action == null || productIdStr == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "缺少必要的参数");
            return;
        }

        int productId = Integer.parseInt(productIdStr);

        HttpSession session = request.getSession();
        Map<Integer, CartItem> cart = (Map<Integer, CartItem>) session.getAttribute("cart");
        if (cart == null) {
            cart = new HashMap<>();
        }

        switch (action) {
            case "add":
            case "buy_now":
                String quantityStr = request.getParameter("quantity");
                if (quantityStr == null || quantityStr.isEmpty()) {
                    quantityStr = "1"; // 如果没有指定数量，默认为1
                }
                int quantity = Integer.parseInt(quantityStr);
                addToCart(cart, productId, quantity);
                break;
            case "update":
                updateQuantity(cart, productId, Integer.parseInt(request.getParameter("quantity")));
                break;
            case "remove":
                removeFromCart(cart, productId);
                break;
        }

        session.setAttribute("cart", cart);

        if ("buy_now".equals(action)) {
            response.sendRedirect(request.getContextPath() + "/cart");
        } else if ("add".equals(action)) {
            // 如果是通过隐藏iframe提交的，不进行重定向
            if (request.getHeader("Referer") != null) {
                response.sendRedirect(request.getHeader("Referer"));
            }
        } else {
            response.sendRedirect(request.getContextPath() + "/cart");
        }
    }

    private void addToCart(Map<Integer, CartItem> cart, int productId, int quantity) {
        Product product = productService.getProductById(productId);
        cart.compute(productId, (k, v) -> {
            if (v == null) {
                return new CartItem(product, quantity);
            } else {
                v.setQuantity(v.getQuantity() + quantity);
                return v;
            }
        });
    }

    private void updateQuantity(Map<Integer, CartItem> cart, int productId, int newQuantity) {
        if (newQuantity > 0) {
            cart.computeIfPresent(productId, (k, v) -> {
                v.setQuantity(newQuantity);
                return v;
            });
        } else {
            removeFromCart(cart, productId);
        }
    }

    private void removeFromCart(Map<Integer, CartItem> cart, int productId) {
        cart.remove(productId);
    }
}

