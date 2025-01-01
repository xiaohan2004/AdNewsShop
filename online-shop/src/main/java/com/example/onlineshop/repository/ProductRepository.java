package com.example.onlineshop.repository;

import com.example.onlineshop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p ORDER BY p.id")
    List<Product> findAllOrderById();

    @Query("SELECT p FROM Product p WHERE p.featured = true")
    List<Product> findFeaturedProducts();

    @Query("SELECT p FROM Product p ORDER BY p.salesCount DESC")
    List<Product> findTopSellingProducts();
}
