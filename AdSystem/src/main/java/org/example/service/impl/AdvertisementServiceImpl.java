package org.example.service.impl;

import org.example.pojo.Advertisement;
import org.example.mapper.AdvertisementMapper;
import org.example.service.AdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdvertisementServiceImpl implements AdvertisementService {

    private final AdvertisementMapper advertisementMapper;

    @Autowired
    public AdvertisementServiceImpl(AdvertisementMapper advertisementMapper) {
        this.advertisementMapper = advertisementMapper;
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
}

