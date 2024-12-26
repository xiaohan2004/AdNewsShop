package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.mapper.AdvertiserMapper;
import org.example.pojo.Advertiser;
import org.example.pojo.Result;
import org.example.service.AdministratorService;
import org.example.service.AdvertiserService;
import org.example.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class AdvertiserLoginController {
    @Autowired
    private AdvertiserService advertiserService;

    @PostMapping("/advertiserlogin")
    public Result login(@RequestBody Advertiser advertiser){
        log.info("广告主登录: {}", advertiser);
        Advertiser a = advertiserService.login(advertiser);

        //登录成功,生成令牌,下发令牌
        if (a != null){
            Map<String, Object> claims = new HashMap<>();
            claims.put("username", a.getUsername());

            String jwt = JwtUtils.generateJwt(claims); //jwt包含了当前登录的广告主信息
            return Result.success(jwt);
        }

        //登录失败, 返回错误信息
        return Result.error("用户名或密码错误");
    }
}
