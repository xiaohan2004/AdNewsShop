package org.example.service;

import org.example.pojo.Administrator;

import java.util.List;

public interface AdministratorService {
    List<Administrator> findAll();
    Administrator findById(Integer id);
    Administrator create(Administrator administrator);
    Administrator update(Integer id, Administrator administrator);
    void deleteById(Integer id);
}

