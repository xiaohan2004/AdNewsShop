package org.example.service.impl;

import org.example.pojo.User;
import org.example.mapper.UserMapper;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public List<User> findAll() {
        return userMapper.findAll();
    }

    @Override
    public User findById(Integer id) {
        return userMapper.findById(id);
    }

    @Override
    public User create(User user) {
        userMapper.insert(user);
        return user;
    }

    @Override
    public User update(Integer id, User user) {
        User existingUser = userMapper.findById(id);
        if (existingUser != null) {
            user.setId(id);
            userMapper.update(user);
            return user;
        }
        return null;
    }

    @Override
    public void deleteById(Integer id) {
        userMapper.deleteById(id);
    }
}
