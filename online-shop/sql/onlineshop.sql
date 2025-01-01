DROP DATABASE IF EXISTS onlineshop;
CREATE DATABASE onlineshop;
USE onlineshop;

CREATE TABLE `products` (
                            `id` bigint NOT NULL AUTO_INCREMENT,
                            `name` varchar(255) DEFAULT NULL,
                            `price` double DEFAULT NULL,
                            `category` varchar(255) DEFAULT NULL,
                            `image` varchar(255) DEFAULT NULL,
                            `description` text,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
