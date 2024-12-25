package org.example.mapper;

import org.example.pojo.Administrator;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AdministratorMapper {

    @Select("SELECT * FROM administrators")
    List<Administrator> findAll();

    @Select("SELECT * FROM administrators WHERE id = #{id}")
    Administrator findById(Integer id);

    @Insert("INSERT INTO administrators(username, password) VALUES(#{username}, #{password})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Administrator administrator);

    @Update("UPDATE administrators SET username = #{username}, password = #{password} WHERE id = #{id}")
    int update(Administrator administrator);

    @Delete("DELETE FROM administrators WHERE id = #{id}")
    int deleteById(Integer id);
}

