package com.example.newswebsite.controller;

import com.example.newswebsite.model.News;
import com.example.newswebsite.service.NewsService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Set;

@WebServlet("/news")
public class NewsServlet extends HttpServlet {
    private NewsService newsService = new NewsService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        String category = request.getParameter("category");

        try {
            if ("search".equals(action)) {
                searchNews(request, response);
            } else if ("view".equals(action)) {
                viewNews(request, response);
            } else if (category != null && !category.isEmpty()) {
                listNewsByCategory(request, response, category);
            } else {
                listNews(request, response);
            }
        } catch (SQLException e) {
            throw new ServletException("Error processing news", e);
        }
    }

    private void listNews(HttpServletRequest request, HttpServletResponse response) throws SQLException, ServletException, IOException {
        int page = 1;
        int pageSize = 10;

        String pageStr = request.getParameter("page");
        if (pageStr != null && !pageStr.isEmpty()) {
            page = Integer.parseInt(pageStr);
        }

        List<News> newsList = newsService.getNewsPaginated(page, pageSize);
        int totalNews = newsService.getTotalNewsCount();
        int totalPages = (int) Math.ceil((double) totalNews / pageSize);

        Set<String> categories = newsService.getAllCategories();

        request.setAttribute("newsList", newsList);
        request.setAttribute("currentPage", page);
        request.setAttribute("totalPages", totalPages);
        request.setAttribute("categories", categories);
        request.getRequestDispatcher("/WEB-INF/views/news.jsp").forward(request, response);
    }

    private void listNewsByCategory(HttpServletRequest request, HttpServletResponse response, String category) throws SQLException, ServletException, IOException {
        int page = 1;
        int pageSize = 10;

        String pageStr = request.getParameter("page");
        if (pageStr != null && !pageStr.isEmpty()) {
            page = Integer.parseInt(pageStr);
        }

        List<News> newsList = newsService.getNewsByCategory(category, page, pageSize);
        int totalNews = newsService.getTotalNewsByCategory(category);
        int totalPages = (int) Math.ceil((double) totalNews / pageSize);

        Set<String> categories = newsService.getAllCategories();

        request.setAttribute("newsList", newsList);
        request.setAttribute("currentPage", page);
        request.setAttribute("totalPages", totalPages);
        request.setAttribute("category", category);
        request.setAttribute("categories", categories);
        request.getRequestDispatcher("/WEB-INF/views/news.jsp").forward(request, response);
    }

    private void searchNews(HttpServletRequest request, HttpServletResponse response) throws SQLException, ServletException, IOException {
        String keyword = request.getParameter("keyword");
        int page = 1;
        int pageSize = 10;

        String pageStr = request.getParameter("page");
        if (pageStr != null && !pageStr.isEmpty()) {
            page = Integer.parseInt(pageStr);
        }

        List<News> newsList = newsService.searchNews(keyword, page, pageSize);
        int totalNews = newsService.getTotalSearchResults(keyword);
        int totalPages = (int) Math.ceil((double) totalNews / pageSize);

        Set<String> categories = newsService.getAllCategories();

        request.setAttribute("newsList", newsList);
        request.setAttribute("currentPage", page);
        request.setAttribute("totalPages", totalPages);
        request.setAttribute("keyword", keyword);
        request.setAttribute("categories", categories);
        request.getRequestDispatcher("/WEB-INF/views/news.jsp").forward(request, response);
    }

    private void viewNews(HttpServletRequest request, HttpServletResponse response) throws SQLException, ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        News news = newsService.getNewsById(id);
        request.setAttribute("news", news);
        request.getRequestDispatcher("/WEB-INF/views/news-detail.jsp").forward(request, response);
    }
}
