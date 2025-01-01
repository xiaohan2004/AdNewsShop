package org.example.aop;

import com.alibaba.fastjson.JSONObject;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.example.mapper.OperateLogMapper;
import org.example.pojo.OperateLog;
import org.example.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Slf4j
@Component
@Aspect //切面类
public class LogAspect {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private OperateLogMapper operateLogMapper;

    @Around("execution(* org.example.service.*.*(..))")
    public Object recordLog(ProceedingJoinPoint joinPoint) throws Throwable {
        // 获取目标方法的名字
        String methodName = joinPoint.getSignature().getName();

        // 你可以添加其它的排除条件
        if (methodName.contains("login") || methodName.contains("register") || methodName.contains("Log")) {
            return joinPoint.proceed();
        }
        String operateUsername;
        try {
            //操作人ID - 当前登录员工ID
            //获取请求头中的jwt令牌, 解析令牌
            String jwt = request.getHeader("token");
            Claims claims = JwtUtils.parseJWT(jwt);
            operateUsername = (String) claims.get("username");
        } catch (Exception e) {
            log.error("解析令牌失败");
            return joinPoint.proceed();
        }

        //操作时间
        LocalDateTime operateTime = LocalDateTime.now();

        //操作类名
        String className = joinPoint.getTarget().getClass().getName();

        //操作方法参数
        Object[] args = joinPoint.getArgs();
        String methodParams = Arrays.toString(args);

        long begin = System.currentTimeMillis();
        //调用原始目标方法运行
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();

        //方法返回值
        String returnValue = JSONObject.toJSONString(result);

        //操作耗时
        Long costTime = end - begin;


        //记录操作日志
        OperateLog operateLog = new OperateLog(null, operateUsername, operateTime, className, methodName, methodParams, returnValue, costTime);
        operateLogMapper.insertOperateLog(operateLog);

        log.info("AOP记录操作日志: {}", operateLog);

        return result;
    }

}
