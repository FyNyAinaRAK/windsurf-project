<?php
// migrate_data.php

$old_db_file = __DIR__ . '/../backend/db.sqlite3';
$new_db_file = __DIR__ . '/database.sqlite';

try {
    $old_pdo = new PDO('sqlite:' . $old_db_file);
    $old_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $old_pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $new_pdo = new PDO('sqlite:' . $new_db_file);
    $new_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $new_pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Migration des informations de l'entreprise
    $result = $old_pdo->query("SELECT * FROM core_companyinfo");
    foreach ($result as $row) {
        $new_pdo->prepare("INSERT INTO company_info (name, description, address, phone, email, website, facebook_url, linkedin_url, business_hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([$row['name'], $row['description'], $row['address'], $row['phone'], $row['email'], $row['website'], $row['facebook_url'], $row['linkedin_url'], $row['business_hours']]);
    }

    // Migration des témoignages
    $result = $old_pdo->query("SELECT * FROM core_testimonial");
    foreach ($result as $row) {
        $new_pdo->prepare("INSERT INTO testimonials (client_name, client_company, content, rating, sector) VALUES (?, ?, ?, ?, ?)")
            ->execute([$row['client_name'], $row['client_company'], $row['content'], $row['rating'], $row['sector']]);
    }

    // Migration des articles d'actualité
    $result = $old_pdo->query("SELECT * FROM core_newsarticle");
    foreach ($result as $row) {
        $new_pdo->prepare("INSERT INTO news_articles (title, slug, content, excerpt, image, published_date, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?)")
            ->execute([$row['title'], $row['slug'], $row['content'], $row['excerpt'], $row['image'], $row['published_date'], $row['is_featured']]);
    }

    // Migration des secteurs
    $result = $old_pdo->query("SELECT * FROM sectors_sector");
    foreach ($result as $row) {
        $new_pdo->prepare("INSERT INTO sectors (id, name, display_name, description, short_description, icon, image, order_num, meta_title, meta_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            ->execute([$row['id'], $row['name'], $row['display_name'], $row['description'], $row['short_description'], $row['icon'], $row['image'], $row['order'], $row['meta_title'], $row['meta_description']]);
    }

    echo "Migration des données terminée avec succès.";

} catch (PDOException $e) {
    echo "Erreur lors de la migration des données : " . $e->getMessage();
}
