package com.example.newswebsite.util;

import com.example.newswebsite.dao.NewsDAOImpl;
import com.example.newswebsite.model.News;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class NewsCrawler {

    // 定义网站配置：URL 和对应的标签
    private static final Map<String, String> WEBSITES = new HashMap<>() {{
        put("https://digi.163.com/", "数码");
        put("https://mobile.163.com/", "手机");
        put("https://tech.163.com/special/metaverse_2022/", "元宇宙");
        put("https://sports.163.com/", "体育");
    }};

    private NewsDAOImpl newsDAO;

    public NewsCrawler() {
        this.newsDAO = new NewsDAOImpl();
    }

    public void crawlAndSaveNews() {
        for (Map.Entry<String, String> entry : WEBSITES.entrySet()) {
            String url = entry.getKey();
            String category = entry.getValue();

            try {
                Document doc = Jsoup.connect(url).get();
                Elements newsElements;

                // 根据 URL 选择不同的选择器
                if (url.equals("https://mobile.163.com/") || url.equals("https://digi.163.com/")) {
                    newsElements = doc.select("li.list_item");
                }  else if(url.equals("https://tech.163.com/special/metaverse_2022/")){
                    newsElements = doc.select("div.area .left ul.newsList li");
                }
                else {
                    newsElements = doc.select("div.bottomnews_main_simg");
                }

                // 抓取新闻数据
                for (Element newsElement : newsElements) {
                    String title = "";
                    String link = "";
                    String content = "";
                    Date publishDate = new Date(); // 默认使用当前时间

                    // 根据 URL 提取标题和链接
                    if (url.equals("https://mobile.163.com/") || url.equals("https://digi.163.com/")) {
                        title = newsElement.select("p.nl-title").text();
                        link = newsElement.select("a.nl_detail").attr("href");
                    } else if(url.equals("https://tech.163.com/special/metaverse_2022/")) {
                        title = newsElement.select("h3.bigsize a").text();
                        link = newsElement.select("h3.bigsize a").attr("href");
                    }
                    else {
                        title = newsElement.select("h2 a").text();
                        link = newsElement.select("h2 a").attr("href");
                    }

                    content = getNewsContent(link);

                    News news = new News(title, content, category, publishDate);

                    newsDAO.saveNews(news);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private String getNewsContent(String url) {
        StringBuilder mainText = new StringBuilder();
        try {
            Document doc = Jsoup.connect(url).get();
            Element postBody = doc.select("div.post_body").first(); // 正文选择器
            if (postBody != null) {
                Elements paragraphs = postBody.select("p");
                for (Element paragraph : paragraphs) {
                    mainText.append(paragraph.text()).append("\n");
                }
            } else {
                System.out.println("未找到正文内容");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return mainText.toString();
    }
}
