package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.pojo.Administrator;
import org.example.pojo.Result;
import org.example.service.AdministratorService;
import org.example.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class AdministratorLoginController {
    @Autowired
    private AdministratorService administratorService;

    @PostMapping("/administratorlogin")
    public Result login(@RequestBody Administrator administrator){
        log.info("管理员登录: {}", administrator);
        Administrator a = administratorService.login(administrator);

        //登录成功,生成令牌,下发令牌
        if (a != null){
            Map<String, Object> claims = new HashMap<>();
            claims.put("id", a.getId());
            claims.put("username", a.getUsername());

            String jwt = JwtUtils.generateJwt(claims); //jwt包含了当前登录的管理员信息
            return Result.success(jwt);
        }

        //登录失败, 返回错误信息
        return Result.error("用户名或密码错误");
    }
}
