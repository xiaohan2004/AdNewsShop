package org.example.controller;

import org.example.pojo.Result;
import org.example.service.OperateLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/log")
public class OperateLogController {
    @Autowired
    private OperateLogService operateLogService;

    @GetMapping
    public Result getAllOperateLogs() {
        return Result.success(operateLogService.getAllOperateLogs());
    }
}
