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

    @Update("UPDATE website_operators SET requesttimes = requesttimes+1 WHERE token = #{token}")
    void addRTBytoken(String token);

    @Update("UPDATE website_operators SET addtimes = addtimes+1 WHERE token = #{token}")
    void addATBytoken(String token);

    @Update("UPDATE website_operators SET clicktimes = clicktimes+1 WHERE token = #{token}")
    void addCTBytoken(String token);

    @Update("UPDATE website_operators SET token = null WHERE id = #{id}")
    void deleteTokenById(Integer id);

    @Update("UPDATE website_operators SET token = #{token} WHERE id = #{id}")
    void reflushTokenById(Integer id, String token);
}

