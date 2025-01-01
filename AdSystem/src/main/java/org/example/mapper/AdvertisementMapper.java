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

    @Insert("INSERT INTO advertisements(title, content, ad_type, image_url, advertiser_id) VALUES(#{title}, #{content}, #{adType}, #{imageUrl}, #{advertiserId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Advertisement advertisement);

    @Update("UPDATE advertisements SET title = #{title}, content = #{content}, ad_type = #{adType}, image_url = #{imageUrl}, advertiser_id = #{advertiserId} WHERE id = #{id}")
    int update(Advertisement advertisement);

    @Delete("DELETE FROM advertisements WHERE id = #{id}")
    int deleteById(Integer id);

    @Select("SELECT * FROM advertisements WHERE advertiser_id = #{id}")
    List<Advertisement> findByAdvertiserId(Integer id);

    @Select("SELECT * FROM advertisements WHERE ad_type = #{adType}")
    List<Advertisement> getAdsByType(String adType);

    @Update("UPDATE advertisements SET requesttimes = requesttimes+1 WHERE id = #{id}")
    void addRTById(Integer id);

    @Update("UPDATE advertisements SET clicktimes = clicktimes+1 WHERE id = #{id}")
    void addCTById(Integer id);
}

