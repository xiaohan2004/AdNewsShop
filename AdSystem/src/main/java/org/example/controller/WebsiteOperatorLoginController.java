package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.pojo.Result;
import org.example.pojo.WebsiteOperator;
import org.example.service.WebsiteOperatorService;
import org.example.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class WebsiteOperatorLoginController {
    @Autowired
    private WebsiteOperatorService websiteOperatorService;

    @PostMapping("/websiteoperatorlogin")
    public Result login(@RequestBody WebsiteOperator websiteOperator){
        log.info("网站运营人员登录: {}", websiteOperator);
        WebsiteOperator w = websiteOperatorService.login(websiteOperator);

        //登录成功,生成令牌,下发令牌
        if (w != null){
            Map<String, Object> claims = new HashMap<>();
            claims.put("username", w.getUsername());

            String jwt = JwtUtils.generateJwt(claims); //jwt包含了当前登录的网站运营人员信息
            return Result.success(jwt);
        }

        //登录失败, 返回错误信息
        return Result.error("用户名或密码错误");
    }
}
