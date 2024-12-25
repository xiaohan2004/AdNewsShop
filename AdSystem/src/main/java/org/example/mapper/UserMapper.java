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
}
