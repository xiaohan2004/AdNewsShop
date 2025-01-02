package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.mapper.UserMapper;
import org.example.pojo.Advertisement;
import org.example.pojo.Result;
import org.example.pojo.User;
import org.example.pojo.WebsiteOperator;
import org.example.service.AdvertisementService;
import org.example.service.UserService;
import org.example.service.WebsiteOperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequestMapping("/ads")
public class AdController {
    private final AdvertisementService advertisementService;
    private final UserService userService;
    private final WebsiteOperatorService websiteOperatorService;

    @Autowired
    public AdController(AdvertisementService advertisementService, UserService userService, WebsiteOperatorService websiteOperatorService) {
        this.advertisementService = advertisementService;
        this.userService = userService;
        this.websiteOperatorService = websiteOperatorService;
    }

    @GetMapping("/{id}")
    public String showPage(@PathVariable Integer id, Model model) {
        if (id <= 0) {
            log.warn("Invalid ad id: {}", id);
            return "404";
        }
        switch (id) {
            case 666:
                return "kulou";
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

    @PostMapping("/get/{fp}")
    @ResponseBody
    public Result getAdsByFP(@PathVariable String fp, @RequestBody WebsiteOperator websiteOperator) {
        return Result.success(advertisementService.getAdsByFP(fp, websiteOperator.getToken()));
    }

    @PostMapping("/post/{fp}/{interest}")
    @ResponseBody
    public Result postUserByFP(@PathVariable String fp, @PathVariable String interest, @RequestBody WebsiteOperator websiteOperator) {
        return Result.success(userService.addInterestByFP(fp, interest, websiteOperator.getToken()));
    }

    @GetMapping("/{id}/{token}")
    public String showPage(@PathVariable Integer id, @PathVariable String token, Model model) {
        WebsiteOperator websiteOperator = websiteOperatorService.findByToken(token);
        if (websiteOperator == null) {
            throw new RuntimeException("Invalid token");
        }
        if (id <= 0) {
            log.warn("Invalid ad id: {}", id);
            return "404";
        }
        switch (id) {
            case 666:
                return "kulou";
        }
        Advertisement ad = advertisementService.findById(id);
        if (ad != null) {
            advertisementService.addCTById(id);
            websiteOperatorService.addCTByToken(token);
            model.addAttribute("title", ad.getTitle());
            model.addAttribute("content", ad.getContent());
            model.addAttribute("adType", ad.getAdType());
            model.addAttribute("imageUrl", ad.getImageUrl());
            return "adpage";
        }
        log.warn("Advertisement not found with id: {}", id);
        return "404";
    }
}
