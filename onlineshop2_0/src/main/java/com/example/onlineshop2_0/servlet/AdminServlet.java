package com.example.onlineshop2_0.servlet;

import com.example.onlineshop2_0.model.Product;
import com.example.onlineshop2_0.service.ProductService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@WebServlet("/admin/*")
public class AdminServlet extends HttpServlet {
    private ProductService productService = new ProductService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            List<Product> products = productService.getAllProducts();
            request.setAttribute("products", products);
            request.getRequestDispatcher("/WEB-INF/jsp/admin/product-list.jsp").forward(request, response);
        } else if (pathInfo.equals("/add")) {
            request.getRequestDispatcher("/WEB-INF/jsp/admin/product-form.jsp").forward(request, response);
        } else if (pathInfo.startsWith("/edit/")) {
            int productId = Integer.parseInt(pathInfo.substring(6));
            Product product = productService.getProductById(productId);
            request.setAttribute("product", product);
            request.getRequestDispatcher("/WEB-INF/jsp/admin/product-form.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        if ("add".equals(action) || "edit".equals(action)) {
            String name = request.getParameter("name");
            String category = request.getParameter("category");
            BigDecimal price = new BigDecimal(request.getParameter("price"));
            String imageUrl = request.getParameter("imageUrl");
            String description = request.getParameter("description");

            Product product = new Product();
            product.setName(name);
            product.setCategory(category);
            product.setPrice(price);
            product.setImageUrl(imageUrl);
            product.setDescription(description);

            if ("add".equals(action)) {
                productService.addProduct(product);
            } else {
                int productId = Integer.parseInt(request.getParameter("id"));
                product.setId(productId);
                productService.updateProduct(product);
            }
        } else if ("delete".equals(action)) {
            int productId = Integer.parseInt(request.getParameter("id"));
            productService.deleteProduct(productId);
        }

        response.sendRedirect(request.getContextPath() + "/admin");
    }
}

