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

@WebServlet("/product")
public class ProductDetailServlet extends HttpServlet {
    private ProductService productService = new ProductService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String productId = request.getParameter("id");
        if (productId != null && !productId.isEmpty()) {
            int id = Integer.parseInt(productId);
            Product product = productService.getProductById(id);
            if (product != null) {
                request.setAttribute("product", product);
                request.getRequestDispatcher("/WEB-INF/jsp/product-detail.jsp").forward(request, response);
            } else {
                response.sendRedirect(request.getContextPath() + "/products");
            }
        } else {
            response.sendRedirect(request.getContextPath() + "/products");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if ("buy_now".equals(action)) {
            int productId = Integer.parseInt(request.getParameter("productId"));
            int quantity = Integer.parseInt(request.getParameter("quantity"));

            HttpSession session = request.getSession();
            Map<Integer, CartItem> cart = new HashMap<>();
            Product product = productService.getProductById(productId);
            cart.put(productId, new CartItem(product, quantity));
            session.setAttribute("cart", cart);

            response.sendRedirect(request.getContextPath() + "/cart");
        } else {
            doGet(request, response);
        }
    }
}