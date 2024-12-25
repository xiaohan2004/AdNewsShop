package org.example.service.impl;

import org.example.pojo.WebsiteOperator;
import org.example.mapper.WebsiteOperatorMapper;
import org.example.service.WebsiteOperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebsiteOperatorServiceImpl implements WebsiteOperatorService {

    private final WebsiteOperatorMapper websiteOperatorMapper;

    @Autowired
    public WebsiteOperatorServiceImpl(WebsiteOperatorMapper websiteOperatorMapper) {
        this.websiteOperatorMapper = websiteOperatorMapper;
    }

    @Override
    public List<WebsiteOperator> findAll() {
        return websiteOperatorMapper.findAll();
    }

    @Override
    public WebsiteOperator findById(Integer id) {
        return websiteOperatorMapper.findById(id);
    }

    @Override
    public WebsiteOperator create(WebsiteOperator websiteOperator) {
        websiteOperatorMapper.insert(websiteOperator);
        return websiteOperator;
    }

    @Override
    public WebsiteOperator update(Integer id, WebsiteOperator websiteOperator) {
        WebsiteOperator existingOperator = websiteOperatorMapper.findById(id);
        if (existingOperator != null) {
            websiteOperator.setId(id);
            websiteOperatorMapper.update(websiteOperator);
            return websiteOperator;
        }
        return null;
    }

    @Override
    public void deleteById(Integer id) {
        websiteOperatorMapper.deleteById(id);
    }
}

