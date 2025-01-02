package org.example.service.impl;

import org.example.mapper.WebsiteOperatorMapper;
import org.example.pojo.Advertisement;
import org.example.pojo.User;
import org.example.mapper.UserMapper;
import org.example.pojo.WebsiteOperator;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final WebsiteOperatorMapper websiteOperatorMapper;

    @Autowired
    public UserServiceImpl(UserMapper userMapper, WebsiteOperatorMapper websiteOperatorMapper) {
        this.userMapper = userMapper;
        this.websiteOperatorMapper = websiteOperatorMapper;
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

    @Override
    @Transactional
    public int addInterestByFP(String fp, String interest, String token) {
        WebsiteOperator websiteOperator = websiteOperatorMapper.findByToken(token);
        if (websiteOperator == null) {
            throw new RuntimeException("Invalid token");
        }
        User user = userMapper.findByFP(fp);
        interest = "interest_" + interest;
        if (user == null) {
            User newUser = new User();
            newUser.setBrowserFingerprint(fp);
            userMapper.insert(newUser);
        }
        websiteOperatorMapper.addATBytoken(token);
        return userMapper.addInterestByFP(fp, interest);
    }
}
