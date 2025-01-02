package org.example.mapper;

import org.example.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM users")
    List<User> findAll();

    @Select("SELECT * FROM users WHERE id = #{id}")
    User findById(Integer id);

    @Insert("INSERT INTO users(cookie, browser_fingerprint) VALUES(#{cookie}, #{browserFingerprint})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);

    @Update("UPDATE users SET cookie = #{cookie}, browser_fingerprint = #{browserFingerprint}, interest_games = #{interestGames}, interest_digital_products = #{interestDigitalProducts}, interest_automotive = #{interestAutomotive}, interest_lifestyle = #{interestLifestyle}, interest_travel = #{interestTravel}, interest_entertainment = #{interestEntertainment}, interest_food = #{interestFood}, interest_fashion = #{interestFashion}, interest_health = #{interestHealth}, interest_sports = #{interestSports} WHERE id = #{id}")
    int update(User user);

    @Delete("DELETE FROM users WHERE id = #{id}")
    int deleteById(Integer id);

    @Select("SELECT \n" +
            "  CASE \n" +
            "    WHEN greatest_interest IS NULL THEN 'games'\n" +
            "    WHEN greatest_interest = 0 THEN 'games'\n" +
            "    WHEN greatest_interest = interest_games THEN 'games'\n" +
            "    WHEN greatest_interest = interest_digital_products THEN 'digital_products'\n" +
            "    WHEN greatest_interest = interest_automotive THEN 'automotive'\n" +
            "    WHEN greatest_interest = interest_lifestyle THEN 'lifestyle'\n" +
            "    WHEN greatest_interest = interest_travel THEN 'travel'\n" +
            "    WHEN greatest_interest = interest_entertainment THEN 'entertainment'\n" +
            "    WHEN greatest_interest = interest_food THEN 'food'\n" +
            "    WHEN greatest_interest = interest_fashion THEN 'fashion'\n" +
            "    WHEN greatest_interest = interest_health THEN 'health'\n" +
            "    WHEN greatest_interest = interest_sports THEN 'sports'\n" +
            "    ELSE 'games'\n" +
            "  END AS highest_interest_category\n" +
            "FROM (\n" +
            "  SELECT \n" +
            "    GREATEST(\n" +
            "      COALESCE(interest_games, -1),\n" +
            "      COALESCE(interest_digital_products, -1),\n" +
            "      COALESCE(interest_automotive, -1),\n" +
            "      COALESCE(interest_lifestyle, -1),\n" +
            "      COALESCE(interest_travel, -1),\n" +
            "      COALESCE(interest_entertainment, -1),\n" +
            "      COALESCE(interest_food, -1),\n" +
            "      COALESCE(interest_fashion, -1),\n" +
            "      COALESCE(interest_health, -1),\n" +
            "      COALESCE(interest_sports, -1)\n" +
            "    ) AS greatest_interest,\n" +
            "    interest_games,\n" +
            "    interest_digital_products,\n" +
            "    interest_automotive,\n" +
            "    interest_lifestyle,\n" +
            "    interest_travel,\n" +
            "    interest_entertainment,\n" +
            "    interest_food,\n" +
            "    interest_fashion,\n" +
            "    interest_health,\n" +
            "    interest_sports\n" +
            "  FROM users\n" +
            "  WHERE browser_fingerprint = #{fp}\n" +
            ") subquery")
    String getInterestByFP(String fp);

    @Update("UPDATE users SET ${interest} = ${interest} + 1 WHERE browser_fingerprint = #{fp}")
    int addInterestByFP(String fp, String interest);

    @Select("SELECT * FROM users WHERE browser_fingerprint = #{fp}")
    User findByFP(String fp);
}
