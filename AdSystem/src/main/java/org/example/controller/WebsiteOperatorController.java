package org.example.controller;

import org.example.pojo.Result;
import org.example.pojo.WebsiteOperator;
import org.example.service.WebsiteOperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/website-operators")
public class WebsiteOperatorController {

    private final WebsiteOperatorService websiteOperatorService;

    @Autowired
    public WebsiteOperatorController(WebsiteOperatorService websiteOperatorService) {
        this.websiteOperatorService = websiteOperatorService;
    }

    @GetMapping
    public Result getAllWebsiteOperators() {
        List<WebsiteOperator> operators = websiteOperatorService.findAll();
        return Result.success(operators);
    }

    @GetMapping("/{id}")
    public Result getWebsiteOperatorById(@PathVariable Integer id) {
        WebsiteOperator operator = websiteOperatorService.findById(id);
        if (operator != null) {
            return Result.success(operator);
        } else {
            return Result.error("Not Found");
        }
    }

    @PostMapping
    public Result createWebsiteOperator(@RequestBody WebsiteOperator websiteOperator) {
        WebsiteOperator createdOperator = websiteOperatorService.create(websiteOperator);
        return Result.success(createdOperator);
    }

    @PutMapping("/{id}")
    public Result updateWebsiteOperator(@PathVariable Integer id, @RequestBody WebsiteOperator websiteOperator) {
        WebsiteOperator updatedOperator = websiteOperatorService.update(id, websiteOperator);
        if (updatedOperator != null) {
            return Result.success(updatedOperator);
        } else {
            return Result.error("Not Found");
        }
    }

    @DeleteMapping("/{id}")
    public Result deleteWebsiteOperator(@PathVariable Integer id) {
        websiteOperatorService.deleteById(id);
        return Result.success();
    }

    @DeleteMapping("/token/{id}")
    public Result deleteWebsiteOperatorToken(@PathVariable Integer id) {
        websiteOperatorService.deleteTokenById(id);
        return Result.success();
    }

    @GetMapping("/token/{id}")
    public Result reflushWebsiteOperatorToken(@PathVariable Integer id) {
        String token = websiteOperatorService.reflushTokenById(id);
        if (token != null) {
            return Result.success(token);
        } else {
            return Result.error("Not Found");
        }
    }
}

