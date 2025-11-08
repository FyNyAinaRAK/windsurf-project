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

    public function updateCompanyInfo($data) {
        // ... (code existant)
    }

    public function createNewsArticle($data) {
        $sql = "INSERT INTO news_articles (title, slug, content, excerpt, image, published_date, is_featured)
                VALUES (:title, :slug, :content, :excerpt, :image, :published_date, :is_featured)";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':title' => $data['title'],
            ':slug' => $data['slug'],
            ':content' => $data['content'],
            ':excerpt' => $data['excerpt'],
            ':image' => $data['image'],
            ':published_date' => $data['published_date'],
            ':is_featured' => isset($data['is_featured']) ? 1 : 0,
        ]);
    }

    public function updateNewsArticle($data) {
        // ... (code existant)
    }

    public function deleteNewsArticle($id) {
        $sql = "DELETE FROM news_articles WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
    }

    public function createSector($data) {
        $sql = "INSERT INTO sectors (name, display_name, description, short_description, icon, image, \"order\", meta_title, meta_description)
                VALUES (:name, :display_name, :description, :short_description, :icon, :image, :order, :meta_title, :meta_description)";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':name' => $data['name'],
            ':display_name' => $data['display_name'],
            ':description' => $data['description'],
            ':short_description' => $data['short_description'],
            ':icon' => $data['icon'],
            ':image' => $data['image'],
            ':order' => $data['order'],
            ':meta_title' => $data['meta_title'],
            ':meta_description' => $data['meta_description'],
        ]);
    }

    public function updateSector($data) {
        // ... (code existant)
    }

    public function deleteSector($id) {
        $sql = "DELETE FROM sectors WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
    }

    public function createService($data) {
        $sql = "INSERT INTO services (sector_id, name, description, icon, \"order\", is_administrative)
                VALUES (:sector_id, :name, :description, :icon, :order, :is_administrative)";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':sector_id' => $data['sector_id'],
            ':name' => $data['name'],
            ':description' => $data['description'],
            ':icon' => $data['icon'],
            ':order' => $data['order'],
            ':is_administrative' => isset($data['is_administrative']) ? 1 : 0,
        ]);
    }

    public function updateService($data) {
        // ... (code existant)
    }

    public function deleteService($id) {
        $sql = "DELETE FROM services WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
    }

    public function createTestimonial($data) {
        $sql = "INSERT INTO testimonials (client_name, client_company, content, rating, sector)
                VALUES (:client_name, :client_company, :content, :rating, :sector)";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':client_name' => $data['client_name'],
            ':client_company' => $data['client_company'],
            ':content' => $data['content'],
            ':rating' => $data['rating'],
            ':sector' => $data['sector'],
        ]);
    }

    public function updateTestimonial($data) {
        // ... (code existant)
    }

    public function deleteTestimonial($id) {
        $sql = "DELETE FROM testimonials WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
    }

    public function getContactMessages() {
        return json_encode($this->query("SELECT * FROM contact_messages ORDER BY created_at DESC"));
    }

    public function getNewsletterSubscribers() {
        return json_encode($this->query("SELECT * FROM newsletter_subscriptions ORDER BY created_at DESC"));
    }
}
