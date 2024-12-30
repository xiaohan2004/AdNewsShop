package org.example.service;

import org.example.pojo.Advertisement;

import java.util.List;

public interface AdvertisementService {
    List<Advertisement> findAll();
    Advertisement findById(Integer id);
    Advertisement create(Advertisement advertisement);
    Advertisement update(Integer id, Advertisement advertisement);
    void deleteById(Integer id);
    List<Advertisement> findByAdvertiserId(Integer id);
}

