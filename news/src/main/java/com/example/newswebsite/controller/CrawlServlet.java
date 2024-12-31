package com.example.newswebsite.controller;

import com.example.newswebsite.util.NewsCrawler;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/crawl")
public class CrawlServlet extends HttpServlet {
    private final NewsCrawler newsCrawler = new NewsCrawler();
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        newsCrawler.crawlAndSaveNews();
    }
}