package com.example.newswebsite.dao;

import com.example.newswebsite.model.News;
import com.example.newswebsite.util.DatabaseUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class NewsDAOImpl implements NewsDAO {

    @Override
    public List<News> getAllNews() throws SQLException {
        List<News> newsList = new ArrayList<>();
        String sql = "SELECT * FROM news ORDER BY publish_date DESC";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                newsList.add(extractNewsFromResultSet(rs));
            }
        }

        return newsList;
    }

    @Override
    public List<News> getNewsPaginated(int page, int pageSize) throws SQLException {
        List<News> newsList = new ArrayList<>();
        String sql = "SELECT * FROM news ORDER BY publish_date DESC LIMIT ? OFFSET ?";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, pageSize);
            stmt.setInt(2, (page - 1) * pageSize);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    newsList.add(extractNewsFromResultSet(rs));
                }
            }
        }

        return newsList;
    }

    @Override
    public int getTotalNewsCount() throws SQLException {
        String sql = "SELECT COUNT(*) FROM news";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            if (rs.next()) {
                return rs.getInt(1);
            }
        }

        return 0;
    }

    @Override
    public List<News> searchNews(String keyword) throws SQLException {
        List<News> newsList = new ArrayList<>();
        String sql = "SELECT * FROM news WHERE title LIKE ? OR content LIKE ? ORDER BY publish_date DESC";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, "%" + keyword + "%");
            stmt.setString(2, "%" + keyword + "%");

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    newsList.add(extractNewsFromResultSet(rs));
                }
            }
        }

        return newsList;
    }

    @Override
    public News getNewsById(int id) throws SQLException {
        String sql = "SELECT * FROM news WHERE id = ?";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return extractNewsFromResultSet(rs);
                }
            }
        }

        return null;
    }

    @Override
    public void createNews(News news) throws SQLException {
        String sql = "INSERT INTO news (title, content, category, publish_date) VALUES (?, ?, ?, ?)";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, news.getTitle());
            stmt.setString(2, news.getContent());
            stmt.setString(3, news.getCategory());
            stmt.setTimestamp(4, new Timestamp(news.getPublishDate().getTime()));

            int affectedRows = stmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Creating news failed, no rows affected.");
            }

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    news.setId(generatedKeys.getInt(1));
                } else {
                    throw new SQLException("Creating news failed, no ID obtained.");
                }
            }
        }
    }

    @Override
    public void updateNews(News news) throws SQLException {
        String sql = "UPDATE news SET title = ?, content = ?, category = ?, publish_date = ? WHERE id = ?";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, news.getTitle());
            stmt.setString(2, news.getContent());
            stmt.setString(3, news.getCategory());
            stmt.setTimestamp(4, new Timestamp(news.getPublishDate().getTime()));
            stmt.setInt(5, news.getId());

            int affectedRows = stmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Updating news failed, no rows affected.");
            }
        }
    }

    @Override
    public void deleteNews(int id) throws SQLException {
        String sql = "DELETE FROM news WHERE id = ?";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            int affectedRows = stmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Deleting news failed, no rows affected.");
            }
        }
    }

    private News extractNewsFromResultSet(ResultSet rs) throws SQLException {
        News news = new News();
        news.setId(rs.getInt("id"));
        news.setTitle(rs.getString("title"));
        news.setContent(rs.getString("content"));
        news.setCategory(rs.getString("category"));
        news.setPublishDate(rs.getTimestamp("publish_date"));
        return news;
    }

    @Override
    public List<News> getNewsByCategory(String category, int page, int pageSize) throws SQLException {
        List<News> newsList = new ArrayList<>();
        String sql = "SELECT * FROM news WHERE category = ? ORDER BY publish_date DESC LIMIT ? OFFSET ?";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, category);
            stmt.setInt(2, pageSize);
            stmt.setInt(3, (page - 1) * pageSize);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    newsList.add(extractNewsFromResultSet(rs));
                }
            }
        }

        return newsList;
    }

    @Override
    public int getTotalNewsByCategory(String category) throws SQLException {
        String sql = "SELECT COUNT(*) FROM news WHERE category = ?";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, category);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }

        return 0;
    }

    @Override
    public List<News> searchNews(String keyword, int page, int pageSize) throws SQLException {
        List<News> newsList = new ArrayList<>();
        String sql = "SELECT * FROM news WHERE title LIKE ? OR content LIKE ? ORDER BY publish_date DESC LIMIT ? OFFSET ?";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, "%" + keyword + "%");
            stmt.setString(2, "%" + keyword + "%");
            stmt.setInt(3, pageSize);
            stmt.setInt(4, (page - 1) * pageSize);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    newsList.add(extractNewsFromResultSet(rs));
                }
            }
        }

        return newsList;
    }

    @Override
    public int getTotalSearchResults(String keyword) throws SQLException {
        String sql = "SELECT COUNT(*) FROM news WHERE title LIKE ? OR content LIKE ?";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, "%" + keyword + "%");
            stmt.setString(2, "%" + keyword + "%");

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }

        return 0;
    }

    @Override
    public boolean newsExists(String title) throws SQLException {
        String sql = "SELECT COUNT(*) FROM news WHERE title = ?";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, title);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) > 0;
                }
            }
        }

        return false;
    }

    @Override
    public Set<String> getAllCategories() throws SQLException {
        Set<String> categories = new HashSet<>();
        String sql = "SELECT DISTINCT category FROM news";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                categories.add(rs.getString("category"));
            }
        }

        return categories;
    }
    @Override
    public void saveNews(News news) {
        String sql = "INSERT INTO news (title, content, category, publish_date) VALUES (?, ?, ?, ?)";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, news.getTitle());
            stmt.setString(2, news.getContent());
            stmt.setString(3, news.getCategory());
            stmt.setDate(4, new java.sql.Date(news.getPublishDate().getTime()));

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
