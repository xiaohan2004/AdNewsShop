package com.example.newswebsite.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseUtil {
    static final String URL = "jdbc:mysql://localhost:3306/usst?allowPublicKeyRetrieval=true&useUnicode=true&serverTimezone=GMT&characterEncoding=UTF-8&useSSL=false";
    static final String USER = "root";
    static final String PASSWORD = "thyghf931114";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Failed to load MySQL driver", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
