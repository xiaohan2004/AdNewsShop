package org.example.service;

import org.example.pojo.WebsiteOperator;

import java.util.List;

public interface WebsiteOperatorService {
    List<WebsiteOperator> findAll();
    WebsiteOperator findById(Integer id);
    WebsiteOperator create(WebsiteOperator websiteOperator);
    WebsiteOperator update(Integer id, WebsiteOperator websiteOperator);
    void deleteById(Integer id);
    WebsiteOperator login(WebsiteOperator websiteOperator);
    WebsiteOperator register(WebsiteOperator websiteOperator);
}

