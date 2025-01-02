package com.example.onlineshop2_0.servlet;

import com.example.onlineshop2_0.dao.ProductDAO;
import com.example.onlineshop2_0.model.Product;
import com.example.onlineshop2_0.service.ProductService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@WebServlet("/products")
public class ProductListServlet extends HttpServlet {
    private ProductService productService = new ProductService();
    private static final List<String> CATEGORIES = Arrays.asList(
            "游戏", "数码产品", "汽车", "生活", "旅游", "娱乐", "美食", "时尚", "健康医疗", "体育"
    );

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String category = request.getParameter("category");
        String keyword = request.getParameter("keyword");

        List<Product> products;
        if (category != null && !category.isEmpty()) {
            products = productService.getProductsByCategory(category);
        } else if (keyword != null && !keyword.isEmpty()) {
            products = productService.searchProducts(keyword);
        } else {
            products = productService.getAllProducts();
        }

        request.setAttribute("products", products);
        request.setAttribute("categories", CATEGORIES);
        request.setAttribute("selectedCategory", category);
        request.setAttribute("keyword", keyword);

        String message = (String) request.getSession().getAttribute("cartMessage");
        request.setAttribute("cartMessage", message);
        request.getSession().removeAttribute("cartMessage");

        request.getRequestDispatcher("/WEB-INF/jsp/product-list.jsp").forward(request, response);
    }
}

