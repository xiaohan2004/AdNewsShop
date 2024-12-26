package org.example.service;

import org.example.pojo.Advertiser;

import java.util.List;

public interface AdvertiserService {
    List<Advertiser> findAll();
    Advertiser findById(Integer id);
    Advertiser create(Advertiser advertiser);
    Advertiser update(Integer id, Advertiser advertiser);
    void deleteById(Integer id);
    Advertiser login(Advertiser advertiser);
    Advertiser register(Advertiser advertiser);
}

