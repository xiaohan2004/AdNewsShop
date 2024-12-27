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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@WebServlet("/admin/*")
public class AdminServlet extends HttpServlet {
    private NewsService newsService = new NewsService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getPathInfo();

        try {
            switch (action) {
                case "/list":
                    listNews(request, response);
                    break;
                case "/edit":
                    showEditForm(request, response);
                    break;
                case "/delete":
                    deleteNews(request, response);
                    break;
                default:
                    listNews(request, response);
                    break;
            }
        } catch (SQLException e) {
            throw new ServletException("Error processing admin request", e);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getPathInfo();

        try {
            switch (action) {
                case "/create":
                case "/update":
                    createOrUpdateNews(request, response);
                    break;
                default:
                    listNews(request, response);
                    break;
            }
        } catch (SQLException | ParseException e) {
            throw new ServletException("Error processing admin request", e);
        }
    }

    private void listNews(HttpServletRequest request, HttpServletResponse response) throws SQLException, ServletException, IOException {
        List<News> newsList = newsService.getAllNews();
        request.setAttribute("newsList", newsList);
        request.getRequestDispatcher("/WEB-INF/views/admin/list.jsp").forward(request, response);
    }

    private void showEditForm(HttpServletRequest request, HttpServletResponse response) throws SQLException, ServletException, IOException {
        String idStr = request.getParameter("id");
        if (idStr != null && !idStr.isEmpty()) {
            int id = Integer.parseInt(idStr);
            News news = newsService.getNewsById(id);
            request.setAttribute("news", news);
        }
        request.getRequestDispatcher("/WEB-INF/views/admin/edit.jsp").forward(request, response);
    }

    private void createOrUpdateNews(HttpServletRequest request, HttpServletResponse response) throws SQLException, ParseException, IOException {
        String idStr = request.getParameter("id");
        String title = request.getParameter("title");
        String content = request.getParameter("content");
        String category = request.getParameter("category");
        String publishDateStr = request.getParameter("publishDate");

        SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
        SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date publishDate;
        if (publishDateStr != null && !publishDateStr.isEmpty()) {
            publishDate = inputFormat.parse(publishDateStr);
        } else {
            publishDate = new Date(); // Use current date and time if not provided
        }

        News news = new News();
        news.setTitle(title);
        news.setContent(content);
        news.setCategory(category);
        news.setPublishDate(publishDate);

        if (idStr != null && !idStr.isEmpty()) {
            news.setId(Integer.parseInt(idStr));
            newsService.updateNews(news);
        } else {
            newsService.createNews(news);
        }

        response.sendRedirect(request.getContextPath() + "/admin/list");
    }

    private void deleteNews(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        newsService.deleteNews(id);
        response.sendRedirect(request.getContextPath() + "/admin/list");
    }
}
