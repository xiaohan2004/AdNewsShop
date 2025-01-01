package com.example.onlineshop.service;

import com.example.onlineshop.model.Product;
import com.example.onlineshop.mapper.ProductMapper;
import com.example.onlineshop.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAllOrderById();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Transactional
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Transactional
    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found for this id :: " + id));

        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setCategory(productDetails.getCategory());
        product.setImage(productDetails.getImage());
        product.setDescription(productDetails.getDescription());
        product.setSalesCount(productDetails.getSalesCount());
        product.setFeatured(productDetails.isFeatured());

        return productRepository.save(product);
    }

    public List<Product> getFeaturedProducts() {
        List<Product> featuredProducts = productRepository.findFeaturedProducts();
        List<Product> topSellingProducts = productRepository.findTopSellingProducts();

        // Combine manually featured products and top selling products
        return Stream.concat(featuredProducts.stream(), topSellingProducts.stream())
                .distinct()
                .limit(4)
                .collect(Collectors.toList());
    }

    @Transactional
    public void incrementSalesCount(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found for this id :: " + productId));
        product.setSalesCount(product.getSalesCount() + 1);
        productRepository.save(product);
    }
}
