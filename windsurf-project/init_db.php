<?php
// init_db.php

$db_file = __DIR__ . '/database.sqlite';

try {
    $pdo = new PDO('sqlite:' . $db_file);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Table pour les informations de l'entreprise
    $pdo->exec("CREATE TABLE IF NOT EXISTS company_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        address TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        website TEXT,
        facebook_url TEXT,
        linkedin_url TEXT,
        business_hours TEXT
    )");

    // Table pour les témoignages
    $pdo->exec("CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_name TEXT NOT NULL,
        client_company TEXT,
        content TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        sector TEXT
    )");

    // Table pour les articles d'actualité
    $pdo->exec("CREATE TABLE IF NOT EXISTS news_articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        image TEXT,
        published_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_featured INTEGER DEFAULT 0
    )");

    // Table pour les messages de contact
    $pdo->exec("CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        email TEXT NOT NULL,
        telephone TEXT,
        entreprise TEXT,
        secteur TEXT,
        sujet TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'nouveau',
        admin_notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // Table pour les abonnements à la newsletter
    $pdo->exec("CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        nom TEXT,
        secteurs_interesse TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // Table pour les secteurs
    $pdo->exec("CREATE TABLE IF NOT EXISTS sectors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        display_name TEXT NOT NULL,
        description TEXT NOT NULL,
        short_description TEXT,
        icon TEXT,
        image TEXT,
        order_num INTEGER DEFAULT 0,
        meta_title TEXT,
        meta_description TEXT
    )");

    // Table pour les services
    $pdo->exec("CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sector_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT,
        is_administrative INTEGER DEFAULT 0,
        order_num INTEGER DEFAULT 0,
        FOREIGN KEY (sector_id) REFERENCES sectors(id)
    )");

    // Table pour les projets
    $pdo->exec("CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sector_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        client TEXT,
        location TEXT,
        completion_date DATE,
        image TEXT,
        is_featured INTEGER DEFAULT 0,
        budget_range TEXT,
        duration TEXT,
        FOREIGN KEY (sector_id) REFERENCES sectors(id)
    )");

    // Table pour les statistiques des secteurs
    $pdo->exec("CREATE TABLE IF NOT EXISTS sector_statistics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sector_id INTEGER NOT NULL,
        years_experience INTEGER,
        completed_projects INTEGER,
        happy_clients INTEGER,
        team_members INTEGER,
        FOREIGN KEY (sector_id) REFERENCES sectors(id)
    )");

    echo "Base de données et tables créées avec succès.";

} catch (PDOException $e) {
    echo "Erreur lors de la création de la base de données : " . $e->getMessage();
}
