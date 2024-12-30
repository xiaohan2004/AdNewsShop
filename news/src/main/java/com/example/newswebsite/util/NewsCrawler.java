package com.example.newswebsite.util;

import com.example.newswebsite.model.News;
import com.example.newswebsite.service.NewsService;
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;

import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class NewsCrawler {
    private NewsService newsService;

    public NewsCrawler(NewsService newsService) {
        this.newsService = newsService;
    }

    public void crawlNews(String feedUrl) {
        try {
            URL url = new URL(feedUrl);
            SyndFeedInput input = new SyndFeedInput();
            SyndFeed feed = input.build(new XmlReader(url));

            String category = "NYT > " + feed.getTitle();

            for (SyndEntry entry : feed.getEntries()) {
                News news = new News();
                news.setTitle(entry.getTitle());
                news.setContent(entry.getDescription().getValue());
                news.setCategory(category);
                news.setPublishDate(entry.getPublishedDate() != null ? entry.getPublishedDate() : new Date());

                try {
                    if (!newsService.newsExists(news.getTitle())) {
                        newsService.createNews(news);
                    }
                } catch (Exception e) {
                    System.err.println("Error saving news: " + news.getTitle());
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            System.err.println("Error crawling news source: " + feedUrl);
            e.printStackTrace();
        }
    }
}