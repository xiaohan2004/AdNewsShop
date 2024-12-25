package org.example.service.impl;

import org.example.pojo.Administrator;
import org.example.mapper.AdministratorMapper;
import org.example.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministratorServiceImpl implements AdministratorService {

    private final AdministratorMapper administratorMapper;

    @Autowired
    public AdministratorServiceImpl(AdministratorMapper administratorMapper) {
        this.administratorMapper = administratorMapper;
    }

    @Override
    public List<Administrator> findAll() {
        return administratorMapper.findAll();
    }

    @Override
    public Administrator findById(Integer id) {
        return administratorMapper.findById(id);
    }

    @Override
    public Administrator create(Administrator administrator) {
        administratorMapper.insert(administrator);
        return administrator;
    }

    @Override
    public Administrator update(Integer id, Administrator administrator) {
        Administrator existingAdmin = administratorMapper.findById(id);
        if (existingAdmin != null) {
            administrator.setId(id);
            administratorMapper.update(administrator);
            return administrator;
        }
        return null;
    }

    @Override
    public void deleteById(Integer id) {
        administratorMapper.deleteById(id);
    }
}

