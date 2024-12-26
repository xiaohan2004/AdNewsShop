package org.example.mapper;

import org.example.pojo.WebsiteOperator;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface WebsiteOperatorMapper {

    @Select("SELECT * FROM website_operators")
    List<WebsiteOperator> findAll();

    @Select("SELECT * FROM website_operators WHERE id = #{id}")
    WebsiteOperator findById(Integer id);

    @Insert("INSERT INTO website_operators(username, password, website_url, token) VALUES(#{username}, #{password}, #{websiteUrl}, #{token})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(WebsiteOperator websiteOperator);

    @Update("UPDATE website_operators SET username = #{username}, password = #{password}, website_url = #{websiteUrl}, token = #{token} WHERE id = #{id}")
    int update(WebsiteOperator websiteOperator);

    @Delete("DELETE FROM website_operators WHERE id = #{id}")
    int deleteById(Integer id);

    @Select("SELECT * FROM website_operators WHERE username = #{username} AND password = #{password}")
    WebsiteOperator findByUsernameAndPassword(WebsiteOperator websiteOperator);

    @Select("SELECT * FROM website_operators WHERE username = #{username}")
    WebsiteOperator findByUsername(WebsiteOperator websiteOperator);
}

