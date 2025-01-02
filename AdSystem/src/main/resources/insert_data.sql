USE ad_system;

-- 向管理员表插入样本数据
INSERT INTO administrators (username, password)
VALUES ('xiaohan', 'xiaohan'),
       ('管理员1', 'hashed_password_1'),
       ('管理员2', 'hashed_password_2'),
       ('管理员3', 'hashed_password_3');

-- 向广告商表插入样本数据
INSERT INTO advertisers (company_name, username, password)
VALUES ('科技数码有限公司', 'xiaohan', 'xiaohan'),
       ('汽车世界股份公司', 'caradmin', 'hashed_password_5'),
       ('美食天地连锁店', 'foodadmin', 'hashed_password_6'),
       ('环球旅行社', 'traveladmin', 'hashed_password_7'),
       ('时尚前沿服饰', 'fashionadmin', 'hashed_password_8');

-- 向广告表插入样本数据
INSERT INTO advertisements (title, content, ad_type, image_url, advertiser_id, requesttimes, clicktimes)
VALUES ('最新智能手机', '体验未来科技，尽在掌握！', 'digital_products', 'https://shanglixiaohan.oss-cn-shanghai.aliyuncs.com/adsystem/a2fd1eae-2a80-4824-b6ed-484ff1bb733c.png', 1, 10, 3),
       ('豪华轿车大促', '驾驭品质人生，尊享豪华体验', 'automotive', 'https://shanglixiaohan.oss-cn-shanghai.aliyuncs.com/adsystem/a2fd1eae-2a80-4824-b6ed-484ff1bb733c.png', 2,20, 3),
       ('美味披萨', '品味与众不同的美食体验', 'food', 'https://shanglixiaohan.oss-cn-shanghai.aliyuncs.com/adsystem/a2fd1eae-2a80-4824-b6ed-484ff1bb733c.png', 3,10, 1),
       ('异国风情之旅', '这个夏天，来场说走就走的旅行', 'travel', 'https://shanglixiaohan.oss-cn-shanghai.aliyuncs.com/adsystem/a2fd1eae-2a80-4824-b6ed-484ff1bb733c.png', 4,10, 3),
       ('夏季新品上市', '引领时尚潮流，展现独特魅力', 'fashion', 'https://shanglixiaohan.oss-cn-shanghai.aliyuncs.com/adsystem/a2fd1eae-2a80-4824-b6ed-484ff1bb733c.png', 5,10, 3),
       ('次世代游戏主机', '沉浸式游戏体验，尽在掌握', 'games', 'https://shanglixiaohan.oss-cn-shanghai.aliyuncs.com/adsystem/a2fd1eae-2a80-4824-b6ed-484ff1bb733c.png', 1,10, 3),
       ('健康果蔬汁', '每天一杯，开启健康生活', 'health', 'https://shanglixiaohan.oss-cn-shanghai.aliyuncs.com/adsystem/a2fd1eae-2a80-4824-b6ed-484ff1bb733c.png', 3,10, 3),
       ('智能运动手环', '科技助力，轻松实现健身目标', 'digital_products', 'https://shanglixiaohan.oss-cn-shanghai.aliyuncs.com/adsystem/a2fd1eae-2a80-4824-b6ed-484ff1bb733c.png', 1,10, 3),
       ('周末短途游', '发现身边的美，享受惬意时光', 'travel', 'https://shanglixiaohan.oss-cn-shanghai.aliyuncs.com/adsystem/a2fd1eae-2a80-4824-b6ed-484ff1bb733c.png', 4,10, 3),
       ('时尚太阳镜', '护眼更要有型，彰显个性魅力', 'fashion', 'https://shanglixiaohan.oss-cn-shanghai.aliyuncs.com/adsystem/a2fd1eae-2a80-4824-b6ed-484ff1bb733c.png', 5,10, 3);

-- 向用户表插入样本数据
INSERT INTO users (cookie, browser_fingerprint, interest_games, interest_digital_products, interest_automotive,
                   interest_lifestyle, interest_travel, interest_entertainment, interest_food, interest_fashion,
                   interest_health, interest_sports)
VALUES ('cookie1', 'fingerprint1', 8, 9, 3, 6, 7, 8, 5, 4, 6, 7),
       ('cookie2', 'fingerprint2', 3, 7, 9, 5, 4, 6, 7, 8, 5, 4),
       ('cookie3', 'fingerprint3', 5, 6, 4, 8, 9, 7, 8, 9, 7, 6),
       ('cookie4', 'fingerprint4', 7, 8, 5, 7, 6, 9, 9, 5, 8, 8),
       ('cookie5', 'fingerprint5', 9, 5, 7, 9, 8, 5, 6, 7, 9, 5);

-- 向网站运营者表插入样本数据
INSERT INTO website_operators (username, password, website_url, token, requesttimes, addtimes, clicktimes)
VALUES ('科技博客', 'hashed_password_9', 'https://techblog.cn', 'token1', 10, 3, 1),
       ('新闻门户', 'hashed_password_10', 'https://newsportal.cn', 'token2', 20, 3, 1),
       ('游戏论坛', 'hashed_password_11', 'https://gamingforum.cn', 'token3', 10, 3, 1),
       ('生活方式博客', 'hashed_password_12', 'https://lifestyleblog.cn', 'token4', 10, 3, 1),
       ('体育网站', 'hashed_password_13', 'https://sportswebsite.cn', 'token5', 10, 3, 1);