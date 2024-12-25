package org.example.controller;

import org.example.pojo.Administrator;
import org.example.pojo.Result;
import org.example.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/administrators")
public class AdministratorController {

    private final AdministratorService administratorService;

    @Autowired
    public AdministratorController(AdministratorService administratorService) {
        this.administratorService = administratorService;
    }

    @GetMapping
    public Result getAllAdministrators() {
        List<Administrator> administrators = administratorService.findAll();
        return Result.success(administrators);
    }

    @GetMapping("/{id}")
    public Result getAdministratorById(@PathVariable Integer id) {
        Administrator administrator = administratorService.findById(id);
        if (administrator != null) {
            return Result.success(administrator);
        } else {
            return Result.error("Not Found");
        }
    }

    @PostMapping
    public Result createAdministrator(@RequestBody Administrator administrator) {
        Administrator createdAdmin = administratorService.create(administrator);
        return Result.success(createdAdmin);
    }

    @PutMapping("/{id}")
    public Result updateAdministrator(@PathVariable Integer id, @RequestBody Administrator administrator) {
        Administrator updatedAdmin = administratorService.update(id, administrator);
        if (updatedAdmin != null) {
            return Result.success(updatedAdmin);
        } else {
            return Result.error("Not Found");
        }
    }

    @DeleteMapping("/{id}")
    public Result deleteAdministrator(@PathVariable Integer id) {
        administratorService.deleteById(id);
        return Result.success();
    }
}

