package org.example.service.impl;

import org.example.mapper.OperateLogMapper;
import org.example.pojo.OperateLog;
import org.example.pojo.Result;
import org.example.service.OperateLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OperateLogServiceImpl implements OperateLogService {
    private final OperateLogMapper operateLogMapper;

    public OperateLogServiceImpl(OperateLogMapper operateLogMapper) {
        this.operateLogMapper = operateLogMapper;
    }

    @Override
    public List<OperateLog> getAllOperateLogs() {
        return operateLogMapper.getAllOperateLogs();
    }

}
