package com.example.newswebsite.model;
import java.util.Date;

public class News {
    private int id;
    private String title;
    private String content;
    private String category;
    private Date publishDate;

    // Constructors
    public News() {}

    public News(String title, String content, String category, Date publishDate) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.publishDate = publishDate;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    @Override
    public String toString() {
        return "News{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", category='" + category + '\'' +
                ", publishDate=" + publishDate +
                '}';
    }
}
