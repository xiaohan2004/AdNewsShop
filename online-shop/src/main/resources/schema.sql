DROP DATABASE IF EXISTS onlineshop;
CREATE DATABASE onlineshop;
USE onlineshop;

CREATE TABLE IF NOT EXISTS product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255),
    image VARCHAR(255)
);

-- 修改 products 表，添加 sales_count 和 featured 字段
ALTER TABLE products
    ADD COLUMN sales_count INT DEFAULT 0,
ADD COLUMN featured BOOLEAN DEFAULT FALSE;