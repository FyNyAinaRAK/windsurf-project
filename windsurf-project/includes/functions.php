<?php
// functions.php

require_once 'db_config.php';

function get_company_info() {
    $pdo = get_pdo();
    $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
    return $stmt->fetch();
}

function get_testimonials($limit = null) {
    $pdo = get_pdo();
    $sql = "SELECT * FROM testimonials ORDER BY RANDOM()";
    if ($limit) {
        $sql .= " LIMIT " . (int)$limit;
    }
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function get_news_articles($limit = null) {
    $pdo = get_pdo();
    $sql = "SELECT * FROM news_articles ORDER BY published_date DESC";
    if ($limit) {
        $sql .= " LIMIT " . (int)$limit;
    }
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function get_news_article_by_slug($slug) {
    $pdo = get_pdo();
    $stmt = $pdo->prepare("SELECT * FROM news_articles WHERE slug = ?");
    $stmt->execute([$slug]);
    return $stmt->fetch();
}

function get_featured_news_articles($limit = 3) {
    $pdo = get_pdo();
    $stmt = $pdo->prepare("SELECT * FROM news_articles WHERE is_featured = 1 ORDER BY published_date DESC LIMIT ?");
    $stmt->execute([$limit]);
    return $stmt->fetchAll();
}

function save_contact_message($data) {
    $pdo = get_pdo();
    $sql = "INSERT INTO contact_messages (nom, email, telephone, entreprise, secteur, sujet, message) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute([
        $data['nom'],
        $data['email'],
        $data['telephone'],
        $data['entreprise'],
        $data['secteur'],
        $data['sujet'],
        $data['message']
    ]);
}

function subscribe_to_newsletter($email, $name = '', $interests = []) {
    $pdo = get_pdo();
    $sql = "INSERT INTO newsletter_subscriptions (email, nom, secteurs_interesse) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute([$email, $name, json_encode($interests)]);
}

function get_sectors() {
    $pdo = get_pdo();
    $stmt = $pdo->query("SELECT * FROM sectors ORDER BY order_num");
    return $stmt->fetchAll();
}

function get_sector_by_name($name) {
    $pdo = get_pdo();
    $stmt = $pdo->prepare("SELECT * FROM sectors WHERE name = ?");
    $stmt->execute([$name]);
    return $stmt->fetch();
}

function get_services_by_sector($sector_id) {
    $pdo = get_pdo();
    $stmt = $pdo->prepare("SELECT * FROM services WHERE sector_id = ? ORDER BY order_num");
    $stmt->execute([$sector_id]);
    return $stmt->fetchAll();
}

function get_projects($limit = null) {
    $pdo = get_pdo();
    $sql = "SELECT p.*, s.display_name as sector_name FROM projects p JOIN sectors s ON p.sector_id = s.id ORDER BY completion_date DESC";
    if ($limit) {
        $sql .= " LIMIT " . (int)$limit;
    }
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function get_projects_by_sector($sector_id, $limit = null) {
    $pdo = get_pdo();
    $sql = "SELECT * FROM projects WHERE sector_id = ? ORDER BY completion_date DESC";
    if ($limit) {
        $sql .= " LIMIT " . (int)$limit;
    }
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$sector_id]);
    return $stmt->fetchAll();
}

function get_featured_projects($limit = 3) {
    $pdo = get_pdo();
    $stmt = $pdo->prepare("SELECT p.*, s.display_name as sector_name FROM projects p JOIN sectors s ON p.sector_id = s.id WHERE p.is_featured = 1 ORDER BY completion_date DESC LIMIT ?");
    $stmt->execute([$limit]);
    return $stmt->fetchAll();
}
