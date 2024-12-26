package com.example.newswebsite.service;

import com.example.newswebsite.dao.NewsDAO;
import com.example.newswebsite.dao.NewsDAOImpl;
import com.example.newswebsite.model.News;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

public class NewsService {
    private NewsDAO newsDAO;

    public NewsService() {
        this.newsDAO = new NewsDAOImpl();
    }

    public List<News> getAllNews() throws SQLException {
        return newsDAO.getAllNews();
    }

    public List<News> getNewsPaginated(int page, int pageSize) throws SQLException {
        return newsDAO.getNewsPaginated(page, pageSize);
    }

    public int getTotalNewsCount() throws SQLException {
        return newsDAO.getTotalNewsCount();
    }

    public List<News> getNewsByCategory(String category, int page, int pageSize) throws SQLException {
        return newsDAO.getNewsByCategory(category, page, pageSize);
    }

    public int getTotalNewsByCategory(String category) throws SQLException {
        return newsDAO.getTotalNewsByCategory(category);
    }

    public List<News> searchNews(String keyword, int page, int pageSize) throws SQLException {
        return newsDAO.searchNews(keyword, page, pageSize);
    }

    public int getTotalSearchResults(String keyword) throws SQLException {
        return newsDAO.getTotalSearchResults(keyword);
    }

    public News getNewsById(int id) throws SQLException {
        return newsDAO.getNewsById(id);
    }

    public void createNews(News news) throws SQLException {
        newsDAO.createNews(news);
    }

    public void updateNews(News news) throws SQLException {
        newsDAO.updateNews(news);
    }

    public void deleteNews(int id) throws SQLException {
        newsDAO.deleteNews(id);
    }

    public boolean newsExists(String title) throws SQLException {
        return newsDAO.newsExists(title);
    }

    public Set<String> getAllCategories() throws SQLException {
        return newsDAO.getAllCategories();
    }
}
