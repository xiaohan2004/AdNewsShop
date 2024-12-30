package com.example.newswebsite.util;

import com.example.newswebsite.service.NewsService;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class NewsScheduler {
    private static final int INITIAL_DELAY = 0;
    private static final int PERIOD = 1;
    private static final TimeUnit TIME_UNIT = TimeUnit.HOURS;

    private NewsService newsService;
    private ScheduledExecutorService scheduler;

    public NewsScheduler(NewsService newsService) {
        this.newsService = newsService;
        this.scheduler = Executors.newScheduledThreadPool(1);
    }

    public void startScheduler() {
        NewsCrawler crawler = new NewsCrawler(newsService);
        scheduler.scheduleAtFixedRate(() -> {
            crawler.crawlNews("https://rss.nytimes.com/services/xml/rss/nyt/World.xml");
            crawler.crawlNews("https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml");
        }, INITIAL_DELAY, PERIOD, TIME_UNIT);
    }

    public void stopScheduler() {
        scheduler.shutdown();
    }
}