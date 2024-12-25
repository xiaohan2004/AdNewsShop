package org.example.controller;

import org.example.pojo.Result;
import org.example.pojo.User;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Result getAllUsers() {
        List<User> users = userService.findAll();
        return Result.success(users);
    }

    @GetMapping("/{id}")
    public Result getUserById(@PathVariable Integer id) {
        User user = userService.findById(id);
        if (user != null) {
            return Result.success(user);
        } else {
            return Result.error("Not Found");
        }
    }

    @PostMapping
    public Result createUser(@RequestBody User user) {
        User createdUser = userService.create(user);
        return Result.success(createdUser);
    }

    @PutMapping("/{id}")
    public Result updateUser(@PathVariable Integer id, @RequestBody User user) {
        User updatedUser = userService.update(id, user);
        if (updatedUser != null) {
            return Result.success(updatedUser);
        } else {
            return Result.error("Not Found");
        }
    }

    @DeleteMapping("/{id}")
    public Result deleteUser(@PathVariable Integer id) {
        userService.deleteById(id);
        return Result.success();
    }
}

