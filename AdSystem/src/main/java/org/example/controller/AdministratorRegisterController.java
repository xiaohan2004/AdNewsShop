package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.pojo.Administrator;
import org.example.pojo.Result;
import org.example.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class AdministratorRegisterController {
    @Autowired
    private AdministratorService administratorService;

    @PostMapping("/administratorregister")
    public Result register(@RequestBody Administrator administrator){
        log.info("管理员注册: {}", administrator);
        try {
            Administrator a = administratorService.register(administrator);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
        return Result.success();
    }
}
