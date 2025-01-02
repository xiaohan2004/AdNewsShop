package org.example.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.pojo.Overview;

@Mapper
public interface OverviewMapper {
    @Select("SELECT\n" +
            "    (SELECT COUNT(*) FROM advertisements) AS total_ads,\n" +
            "    (SELECT SUM(requesttimes) FROM advertisements) AS total_ad_requests,\n" +
            "    (SELECT SUM(clicktimes) FROM advertisements) AS total_ad_clicks,\n" +
            "    (SELECT COUNT(*) FROM advertisers) AS total_advertisers,\n" +
            "    (SELECT COUNT(*) FROM users) AS total_users,\n" +
            "    (SELECT COUNT(*) FROM website_operators) AS total_operators,\n" +
            "    (SELECT SUM(requesttimes) FROM website_operators) AS total_operator_requests,\n" +
            "    (SELECT SUM(addtimes) FROM website_operators) AS total_operator_adds,\n" +
            "    (SELECT SUM(clicktimes) FROM website_operators) AS total_operator_clicks,\n" +
            "    (SELECT COUNT(*) FROM operate_log) AS total_operations,\n" +
            "    (SELECT AVG(cost_time) FROM operate_log) AS avg_operation_time,\n" +
            "    (SELECT COUNT(DISTINCT operate_user) FROM operate_log) AS unique_operators,\n" +
            "    (SELECT \n" +
            "        CONCAT(\n" +
            "            SUBSTRING_INDEX(GROUP_CONCAT(ad_type ORDER BY ad_count DESC SEPARATOR ','), ',', 1)\n" +
            "        ) AS top_ad_type\n" +
            "     FROM (\n" +
            "         SELECT ad_type, COUNT(*) as ad_count\n" +
            "         FROM advertisements\n" +
            "         GROUP BY ad_type\n" +
            "         ORDER BY ad_count DESC\n" +
            "         LIMIT 1\n" +
            "     ) AS top_type) AS most_common_ad_type,\n" +
            "    (SELECT \n" +
            "        CONCAT(\n" +
            "            SUBSTRING_INDEX(GROUP_CONCAT(interest_type ORDER BY interest_score DESC SEPARATOR ','), ',', 1)\n" +
            "        ) AS top_interest\n" +
            "     FROM (\n" +
            "         SELECT 'games' AS interest_type, AVG(interest_games) AS interest_score\n" +
            "         FROM users\n" +
            "         UNION ALL\n" +
            "         SELECT 'digital_products', AVG(interest_digital_products) FROM users\n" +
            "         UNION ALL\n" +
            "         SELECT 'automotive', AVG(interest_automotive) FROM users\n" +
            "         UNION ALL\n" +
            "         SELECT 'lifestyle', AVG(interest_lifestyle) FROM users\n" +
            "         UNION ALL\n" +
            "         SELECT 'travel', AVG(interest_travel) FROM users\n" +
            "         UNION ALL\n" +
            "         SELECT 'entertainment', AVG(interest_entertainment) FROM users\n" +
            "         UNION ALL\n" +
            "         SELECT 'food', AVG(interest_food) FROM users\n" +
            "         UNION ALL\n" +
            "         SELECT 'fashion', AVG(interest_fashion) FROM users\n" +
            "         UNION ALL\n" +
            "         SELECT 'health', AVG(interest_health) FROM users\n" +
            "         UNION ALL\n" +
            "         SELECT 'sports', AVG(interest_sports) FROM users\n" +
            "         ORDER BY interest_score DESC\n" +
            "         LIMIT 1\n" +
            "     ) AS top_interest) AS most_popular_interest")
    Overview getOverview();
}
