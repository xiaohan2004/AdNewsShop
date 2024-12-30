package com.example.onlineshop.mapper;

import com.example.onlineshop.model.Product;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductMapper {

    @Select("SELECT * FROM products")
    List<Product> findAll();

    @Select("SELECT * FROM products WHERE id = #{id}")
    Product findById(Long id);

    @Insert("INSERT INTO products(name, price, category, image, description) VALUES(#{name}, #{price}, #{category}, #{image}, #{description})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Product product);

    @Update("UPDATE products SET name = #{name}, price = #{price}, category = #{category}, image = #{image}, description = #{description} WHERE id = #{id}")
    void update(Product product);

    @Delete("DELETE FROM products WHERE id = #{id}")
    void delete(Long id);
}

