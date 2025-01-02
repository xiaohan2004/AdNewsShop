package com.example.onlineshop2_0.service;

import com.example.onlineshop2_0.dao.ProductDAO;
import com.example.onlineshop2_0.dao.ProductDAOImpl;
import com.example.onlineshop2_0.model.Product;

import java.util.List;

public class ProductService {
    private ProductDAO productDAO = new ProductDAOImpl();

    public List<Product> getAllProducts() {
        return productDAO.getAllProducts();
    }

    public Product getProductById(int id) {
        return productDAO.getProductById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return productDAO.getProductsByCategory(category);
    }

    public List<Product> searchProducts(String keyword) {
        return productDAO.searchProducts(keyword);
    }

    public void addProduct(Product product) {
        productDAO.addProduct(product);
    }

    public void updateProduct(Product product) {
        productDAO.updateProduct(product);
    }

    public void deleteProduct(int id) {
        productDAO.deleteProduct(id);
    }
}
