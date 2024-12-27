package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.pojo.Advertisement;
import org.example.service.AdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/ads")
public class AdController {
    private final AdvertisementService advertisementService;

    @Autowired
    public AdController(AdvertisementService advertisementService) {
        this.advertisementService = advertisementService;
    }

    @GetMapping("/{id}")
    public String showPage(@PathVariable Integer id, Model model) {
        if (id <= 0) {
            log.warn("Invalid ad id: {}", id);
            return "404";
        }
        Advertisement ad = advertisementService.findById(id);
        if (ad == null) {
            log.warn("Advertisement not found with id: {}", id);
            return "404";
        }
        model.addAttribute("title", ad.getTitle());
        model.addAttribute("content", ad.getContent());
        model.addAttribute("adType", ad.getAdType());
        model.addAttribute("imageUrl", ad.getImageUrl());
        return "adpage";
    }
}
