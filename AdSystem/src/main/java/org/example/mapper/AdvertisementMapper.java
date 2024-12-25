package org.example.mapper;

import org.example.pojo.Advertisement;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AdvertisementMapper {

    @Select("SELECT * FROM advertisements")
    List<Advertisement> findAll();

    @Select("SELECT * FROM advertisements WHERE id = #{id}")
    Advertisement findById(Integer id);

    @Insert("INSERT INTO advertisements(content, ad_type, image_url, advertiser_id) VALUES(#{content}, #{adType}, #{imageUrl}, #{advertiserId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Advertisement advertisement);

    @Update("UPDATE advertisements SET content = #{content}, ad_type = #{adType}, image_url = #{imageUrl}, advertiser_id = #{advertiserId} WHERE id = #{id}")
    int update(Advertisement advertisement);

    @Delete("DELETE FROM advertisements WHERE id = #{id}")
    int deleteById(Integer id);
}

