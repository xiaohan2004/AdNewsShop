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

    @Insert("INSERT INTO users(cookie, browser_fingerprint, interest_games, interest_digital_products, interest_automotive, interest_lifestyle, interest_travel, interest_entertainment, interest_food, interest_fashion, interest_health, interest_sports) VALUES(#{cookie}, #{browserFingerprint}, #{interestGames}, #{interestDigitalProducts}, #{interestAutomotive}, #{interestLifestyle}, #{interestTravel}, #{interestEntertainment}, #{interestFood}, #{interestFashion}, #{interestHealth}, #{interestSports})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);

    @Update("UPDATE users SET cookie = #{cookie}, browser_fingerprint = #{browserFingerprint}, interest_games = #{interestGames}, interest_digital_products = #{interestDigitalProducts}, interest_automotive = #{interestAutomotive}, interest_lifestyle = #{interestLifestyle}, interest_travel = #{interestTravel}, interest_entertainment = #{interestEntertainment}, interest_food = #{interestFood}, interest_fashion = #{interestFashion}, interest_health = #{interestHealth}, interest_sports = #{interestSports} WHERE id = #{id}")
    int update(User user);

    @Delete("DELETE FROM users WHERE id = #{id}")
    int deleteById(Integer id);

    @Select("SELECT \n" +
            "    CASE greatest_interest\n" +
            "        WHEN interest_games THEN 'games'\n" +
            "        WHEN interest_digital_products THEN 'digital_products'\n" +
            "        WHEN interest_automotive THEN 'automotive'\n" +
            "        WHEN interest_lifestyle THEN 'lifestyle'\n" +
            "        WHEN interest_travel THEN 'travel'\n" +
            "        WHEN interest_entertainment THEN 'entertainment'\n" +
            "        WHEN interest_food THEN 'food'\n" +
            "        WHEN interest_fashion THEN 'fashion'\n" +
            "        WHEN interest_health THEN 'health'\n" +
            "        WHEN interest_sports THEN 'sports'\n" +
            "    END AS highest_interest_category\n" +
            "FROM (\n" +
            "    SELECT \n" +
            "        GREATEST(\n" +
            "            interest_games,\n" +
            "            interest_digital_products,\n" +
            "            interest_automotive,\n" +
            "            interest_lifestyle,\n" +
            "            interest_travel,\n" +
            "            interest_entertainment,\n" +
            "            interest_food,\n" +
            "            interest_fashion,\n" +
            "            interest_health,\n" +
            "            interest_sports\n" +
            "        ) AS greatest_interest,\n" +
            "        interest_games,\n" +
            "        interest_digital_products,\n" +
            "        interest_automotive,\n" +
            "        interest_lifestyle,\n" +
            "        interest_travel,\n" +
            "        interest_entertainment,\n" +
            "        interest_food,\n" +
            "        interest_fashion,\n" +
            "        interest_health,\n" +
            "        interest_sports\n" +
            "    FROM users\n" +
            "    WHERE browser_fingerprint = #{fp}\n" +
            ") subquery;")
    String getInterestByFP(String fp);

    @Update("UPDATE users SET ${interest} = ${interest} + 1 WHERE browser_fingerprint = #{fp}")
    int addInterestByFP(String fp, String id);

    @Select("SELECT * FROM users WHERE browser_fingerprint = #{fp}")
    User findByFP(String fp);
}
