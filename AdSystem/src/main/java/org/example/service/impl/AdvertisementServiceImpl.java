package org.example.service.impl;

import org.example.mapper.UserMapper;
import org.example.mapper.WebsiteOperatorMapper;
import org.example.pojo.Advertisement;
import org.example.mapper.AdvertisementMapper;
import org.example.pojo.User;
import org.example.service.AdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdvertisementServiceImpl implements AdvertisementService {

    private final AdvertisementMapper advertisementMapper;
    private final UserMapper userMapper;
    private final WebsiteOperatorMapper websiteOperatorMapper;

    @Autowired
    public AdvertisementServiceImpl(AdvertisementMapper advertisementMapper, UserMapper userMapper, WebsiteOperatorMapper websiteOperatorMapper) {
        this.advertisementMapper = advertisementMapper;
        this.userMapper = userMapper;
        this.websiteOperatorMapper = websiteOperatorMapper;
    }

    @Override
    public List<Advertisement> findAll() {
        return advertisementMapper.findAll();
    }

    @Override
    public Advertisement findById(Integer id) {
        return advertisementMapper.findById(id);
    }

    @Override
    public Advertisement create(Advertisement advertisement) {
        advertisementMapper.insert(advertisement);
        return advertisement;
    }

    @Override
    public Advertisement update(Integer id, Advertisement advertisement) {
        Advertisement existingAd = advertisementMapper.findById(id);
        if (existingAd != null) {
            advertisement.setId(id);
            advertisementMapper.update(advertisement);
            return advertisement;
        }
        return null;
    }

    @Override
    public void deleteById(Integer id) {
        advertisementMapper.deleteById(id);
    }

    @Override
    public List<Advertisement> findByAdvertiserId(Integer id) {
        return advertisementMapper.findByAdvertiserId(id);
    }

    @Override
    @Transactional
    public Advertisement getAdsByFP(String fp, String token) {
        User user = userMapper.findByFP(fp);
        if (user != null) {
            String interest = userMapper.getInterestByFP(fp);
            websiteOperatorMapper.addRTBytoken(token);
            List<Advertisement> ads = advertisementMapper.getAdsByType(interest);
            //随机返回一个广告
            Advertisement ad = ads.get((int) (Math.random() * ads.size()));
            advertisementMapper.addRTById(ad.getId());
            return ad;
        }
        else {
            User newUser = new User();
            newUser.setBrowserFingerprint(fp);
            userMapper.insert(newUser);
            websiteOperatorMapper.addATBytoken(token);
            List<Advertisement> ads = advertisementMapper.findAll();
            //随机返回一个广告
            Advertisement ad = ads.get((int) (Math.random() * ads.size()));
            advertisementMapper.addRTById(ad.getId());
            return ad;
        }
    }

    @Override
    public void addCTById(Integer id) {
        advertisementMapper.addCTById(id);
    }
}

