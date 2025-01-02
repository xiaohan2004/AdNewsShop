package org.example.controller;

import org.example.pojo.Advertisement;
import org.example.pojo.Result;
import org.example.service.AdvertisementService;
import org.example.utils.AIChat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advertisements")
public class AdvertisementController {

    private final AdvertisementService advertisementService;

    @Autowired
    public AdvertisementController(AdvertisementService advertisementService) {
        this.advertisementService = advertisementService;
    }

    @GetMapping
    public Result getAllAdvertisements() {
        List<Advertisement> advertisements = advertisementService.findAll();
        return Result.success(advertisements);
    }

    @GetMapping("/{id}")
    public Result getAdvertisementById(@PathVariable Integer id) {
        Advertisement advertisement = advertisementService.findById(id);
        if (advertisement != null) {
            return Result.success(advertisement);
        } else {
            return Result.error("Not Found");
        }
    }

    @GetMapping("/advertiser/{id}")
    public Result getAdvertisementsByAdvertiserId(@PathVariable Integer id) {
        List<Advertisement> advertisements = advertisementService.findByAdvertiserId(id);
        return Result.success(advertisements);
    }

    @PostMapping
    public Result createAdvertisement(@RequestBody Advertisement advertisement) {
        Advertisement createdAd = advertisementService.create(advertisement);
        return Result.success(createdAd);
    }

    @PutMapping("/{id}")
    public Result updateAdvertisement(@PathVariable Integer id, @RequestBody Advertisement advertisement) {
        Advertisement updatedAd = advertisementService.update(id, advertisement);
        if (updatedAd != null) {
            return Result.success(updatedAd);
        } else {
            return Result.error("Not Found");
        }
    }

    @DeleteMapping("/{id}")
    public Result deleteAdvertisement(@PathVariable Integer id) {
        advertisementService.deleteById(id);
        return Result.success();
    }

    @PostMapping("/ai")
    public Result getAIResponse(@RequestBody Advertisement advertisement) {
        return Result.success(AIChat.getResponse(advertisement.getTitle()));
    }
}

