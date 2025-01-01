package org.example.service;

import org.example.pojo.User;

import java.util.List;

public interface UserService {
    List<User> findAll();
    User findById(Integer id);
    User create(User user);
    User update(Integer id, User user);
    void deleteById(Integer id);
    int addInterestByFP(String fp, String interest, String token);
}
