package com.example.onlineshop2_0.dao;

import com.example.onlineshop2_0.model.Product;

import java.util.List;

public interface ProductDAO {
    List<Product> getAllProducts();
    Product getProductById(int id);
    List<Product> getProductsByCategory(String category);
    List<Product> searchProducts(String keyword);
    void addProduct(Product product);
    void updateProduct(Product product);
    void deleteProduct(int id);
}
