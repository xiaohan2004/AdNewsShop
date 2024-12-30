package com.example.newswebsite.listener;

import com.example.newswebsite.service.NewsService;
import com.example.newswebsite.util.NewsScheduler;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

@WebListener
public class NewsSchedulerListener implements ServletContextListener {
    private NewsScheduler scheduler;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        NewsService newsService = new NewsService();
        scheduler = new NewsScheduler(newsService);
        scheduler.startScheduler();
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        if (scheduler != null) {
            scheduler.stopScheduler();
        }
    }
}
