DROP DATABASE IF EXISTS ad_system;
CREATE DATABASE ad_system;
USE ad_system;

/*创建新闻表*/
CREATE TABLE news
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,                 --标题
    content      TEXT         NOT NULL,                 --内容
    category     VARCHAR(100) NOT NULL,                 --标签
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP    --时间
)