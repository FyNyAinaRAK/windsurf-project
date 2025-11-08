<?php

class ApiController {
    private $db;

    public function __construct() {
        $dbPath = __DIR__ . '/../../database/database.sqlite';
        $this->db = new PDO('sqlite:' . $dbPath);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    private function query($sql, $params = []) {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCompanyInfo() {
        return json_encode($this->query("SELECT * FROM company_info LIMIT 1")[0]);
    }

    public function getTestimonials() {
        return json_encode($this->query("SELECT * FROM testimonials ORDER BY created_at DESC"));
    }

    public function getNewsArticles() {
        return json_encode($this->query("SELECT * FROM news_articles ORDER BY published_date DESC"));
    }

    public function getNewsArticle($id) {
        $article = $this->query("SELECT * FROM news_articles WHERE id = ?", [$id]);
        if ($article) {
            return json_encode($article[0]);
        } else {
            http_response_code(404);
            return json_encode(['error' => 'Article not found']);
        }
    }

    public function getSectors() {
        return json_encode($this->query("SELECT * FROM sectors ORDER BY \"order\" ASC"));
    }

    public function getServices() {
        return json_encode($this->query("SELECT * FROM services ORDER BY \"order\" ASC"));
    }

    public function getProjects() {
        return json_encode($this->query("SELECT * FROM projects ORDER BY completion_date DESC"));
    }

    public function getStatistics() {
        return json_encode($this->query("SELECT * FROM sector_statistics"));
    }
}
