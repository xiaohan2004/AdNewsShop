DROP DATABASE IF EXISTS ad_system;
CREATE DATABASE ad_system;
USE ad_system;

-- 创建广告表
CREATE TABLE advertisements
(
    id            INT AUTO_INCREMENT PRIMARY KEY COMMENT '广告唯一标识符',
    content       TEXT        NOT NULL COMMENT '广告内容',
    ad_type       VARCHAR(50) NOT NULL COMMENT '广告类型或标签',
    image_url     VARCHAR(255) COMMENT '广告图片的URL地址',
    advertiser_id INT COMMENT '关联的广告商ID'
) COMMENT '存储广告信息的表';

-- 创建管理员表
CREATE TABLE administrators
(
    id       INT AUTO_INCREMENT PRIMARY KEY COMMENT '管理员唯一标识符',
    username VARCHAR(50)  NOT NULL UNIQUE COMMENT '管理员登录账号',
    password VARCHAR(255) NOT NULL COMMENT '管理员登录密码（应该进行加密存储）'
) COMMENT '存储系统管理员信息的表';

-- 创建广告商表
CREATE TABLE advertisers
(
    id           INT AUTO_INCREMENT PRIMARY KEY COMMENT '广告商唯一标识符',
    company_name VARCHAR(100) NOT NULL COMMENT '广告商公司名称',
    username     VARCHAR(50)  NOT NULL UNIQUE COMMENT '广告商登录账号',
    password     VARCHAR(255) NOT NULL COMMENT '广告商登录密码（应该进行加密存储）'
) COMMENT '存储广告商信息的表';

-- 创建用户表
CREATE TABLE users
(
    id                        INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一标识符',
    cookie                    VARCHAR(255) COMMENT '用户Cookie信息',
    browser_fingerprint       VARCHAR(255) COMMENT '浏览器指纹信息',
    pre1                      VARCHAR(255) COMMENT '预留字段1',
    pre2                      VARCHAR(255) COMMENT '预留字段2',
    pre3                      VARCHAR(255) COMMENT '预留字段3',
    pre4                      VARCHAR(255) COMMENT '预留字段4',
    interest_games            INT COMMENT '用户对游戏类广告的兴趣度',
    interest_digital_products INT COMMENT '用户对数码类广告的兴趣度',
    interest_automotive       INT COMMENT '用户对汽车类广告的兴趣度',
    interest_lifestyle        INT COMMENT '用户对生活类广告的兴趣度',
    interest_travel           INT COMMENT '用户对旅游类广告的兴趣度',
    interest_entertainment    INT COMMENT '用户对娱乐类广告的兴趣度',
    interest_food             INT COMMENT '用户对美食类广告的兴趣度',
    interest_fashion          INT COMMENT '用户对时尚类广告的兴趣度',
    interest_health           INT COMMENT '用户对医疗类广告的兴趣度',
    interest_sports           INT COMMENT '用户对体育类广告的兴趣度'
) COMMENT '存储用户信息和兴趣偏好的表';

-- 添加外键约束
ALTER TABLE advertisements
    ADD CONSTRAINT fk_advertiser
        FOREIGN KEY (advertiser_id) REFERENCES advertisers (id);

-- 添加约束注释
ALTER TABLE advertisements
    COMMENT = '存储广告信息的表，其中advertiser_id与advertisers表关联，表示广告与广告商的关系';