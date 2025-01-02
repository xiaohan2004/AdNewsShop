package org.example.service.impl;

import org.apache.ibatis.annotations.Select;
import org.example.mapper.OverviewMapper;
import org.example.pojo.Overview;
import org.example.service.OverviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OverviewServiceImpl implements OverviewService {
    @Autowired
    OverviewMapper overviewMapper;

    @Override
    public Overview getOverview() {
        return overviewMapper.getOverview();
    }
}
