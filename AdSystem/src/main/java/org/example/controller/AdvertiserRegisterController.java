package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.pojo.Advertiser;
import org.example.pojo.Result;
import org.example.service.AdvertiserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class AdvertiserRegisterController {
    @Autowired
    private AdvertiserService advertiserService;

    @PostMapping("/advertiserregister")
    public Result register(@RequestBody Advertiser advertiser){
        log.info("广告主注册: {}", advertiser);
        try {
            Advertiser a = advertiserService.register(advertiser);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
        return Result.success();
    }
}
