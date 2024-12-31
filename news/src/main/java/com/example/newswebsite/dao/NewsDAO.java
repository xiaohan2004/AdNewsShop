package com.example.newswebsite.dao;

import com.example.newswebsite.model.News;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

public interface NewsDAO {
    List<News> getAllNews() throws SQLException;
    List<News> getNewsPaginated(int page, int pageSize) throws SQLException;
    int getTotalNewsCount() throws SQLException;
    List<News> searchNews(String keyword) throws SQLException;
    News getNewsById(int id) throws SQLException;
    void createNews(News news) throws SQLException;
    void updateNews(News news) throws SQLException;
    void deleteNews(int id) throws SQLException;

    List<News> getNewsByCategory(String category, int page, int pageSize) throws SQLException;

    int getTotalNewsByCategory(String category) throws SQLException;

    List<News> searchNews(String keyword, int page, int pageSize) throws SQLException;

    int getTotalSearchResults(String keyword) throws SQLException;

    boolean newsExists(String title) throws SQLException;

    Set<String> getAllCategories() throws SQLException;

    void saveNews(News news) throws SQLException;
}