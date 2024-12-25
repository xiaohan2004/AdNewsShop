package org.example.mapper;

import org.example.pojo.Advertiser;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AdvertiserMapper {

    @Select("SELECT * FROM advertisers")
    List<Advertiser> findAll();

    @Select("SELECT * FROM advertisers WHERE id = #{id}")
    Advertiser findById(Integer id);

    @Insert("INSERT INTO advertisers(company_name, username, password) VALUES(#{companyName}, #{username}, #{password})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Advertiser advertiser);

    @Update("UPDATE advertisers SET company_name = #{companyName}, username = #{username}, password = #{password} WHERE id = #{id}")
    int update(Advertiser advertiser);

    @Delete("DELETE FROM advertisers WHERE id = #{id}")
    int deleteById(Integer id);
}

