package org.example.service.impl;

import org.example.pojo.Advertiser;
import org.example.mapper.AdvertiserMapper;
import org.example.service.AdvertiserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdvertiserServiceImpl implements AdvertiserService {

    private final AdvertiserMapper advertiserMapper;

    @Autowired
    public AdvertiserServiceImpl(AdvertiserMapper advertiserMapper) {
        this.advertiserMapper = advertiserMapper;
    }

    @Override
    public List<Advertiser> findAll() {
        return advertiserMapper.findAll();
    }

    @Override
    public Advertiser findById(Integer id) {
        return advertiserMapper.findById(id);
    }

    @Override
    public Advertiser create(Advertiser advertiser) {
        advertiserMapper.insert(advertiser);
        return advertiser;
    }

    @Override
    public Advertiser update(Integer id, Advertiser advertiser) {
        Advertiser existingAdvertiser = advertiserMapper.findById(id);
        if (existingAdvertiser != null) {
            advertiser.setId(id);
            advertiserMapper.update(advertiser);
            return advertiser;
        }
        return null;
    }

    @Override
    public void deleteById(Integer id) {
        advertiserMapper.deleteById(id);
    }

    @Override
    public Advertiser login(Advertiser advertiser) {
        return advertiserMapper.findByUsernameAndPassword(advertiser);
    }

    @Override
    public Advertiser register(Advertiser advertiser) {
        Advertiser existingAdvertiser = advertiserMapper.findByUsername(advertiser);
        if (existingAdvertiser != null) {
            throw new RuntimeException("Username already exists");
        }
        advertiserMapper.insert(advertiser);
        return advertiser;
    }
}

