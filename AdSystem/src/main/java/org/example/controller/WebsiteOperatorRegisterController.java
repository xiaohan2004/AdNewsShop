package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.pojo.Result;
import org.example.pojo.WebsiteOperator;
import org.example.service.WebsiteOperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class WebsiteOperatorRegisterController {
    @Autowired
    private WebsiteOperatorService websiteOperatorService;

    @PostMapping("/websiteoperatorregister")
    public Result register(@RequestBody WebsiteOperator websiteOperator){
        log.info("网站运营注册: {}", websiteOperator);
        try {
            WebsiteOperator w = websiteOperatorService.register(websiteOperator);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
        return Result.success();
    }
}
