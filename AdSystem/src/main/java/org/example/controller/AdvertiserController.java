package org.example.controller;

import org.example.pojo.Advertiser;
import org.example.pojo.Result;
import org.example.service.AdvertiserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advertisers")
public class AdvertiserController {

    private final AdvertiserService advertiserService;

    @Autowired
    public AdvertiserController(AdvertiserService advertiserService) {
        this.advertiserService = advertiserService;
    }

    @GetMapping
    public Result getAllAdvertisers() {
        List<Advertiser> advertisers = advertiserService.findAll();
        return Result.success(advertisers);
    }

    @GetMapping("/{id}")
    public Result getAdvertiserById(@PathVariable Integer id) {
        Advertiser advertiser = advertiserService.findById(id);
        if (advertiser != null) {
            return Result.success(advertiser);
        } else {
            return Result.error("Not Found");
        }
    }

    @PostMapping
    public Result createAdvertiser(@RequestBody Advertiser advertiser) {
        Advertiser createdAdvertiser = advertiserService.create(advertiser);
        return Result.success(createdAdvertiser);
    }

    @PutMapping("/{id}")
    public Result updateAdvertiser(@PathVariable Integer id, @RequestBody Advertiser advertiser) {
        Advertiser updatedAdvertiser = advertiserService.update(id, advertiser);
        if (updatedAdvertiser != null) {
            return Result.success(updatedAdvertiser);
        } else {
            return Result.error("Not Found");
        }
    }

    @DeleteMapping("/{id}")
    public Result deleteAdvertiser(@PathVariable Integer id) {
        advertiserService.deleteById(id);
        return Result.success();
    }
}

