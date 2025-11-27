<?php
$db = new SQLite3(__DIR__ . '/database.sqlite');

$db->exec('CREATE TABLE IF NOT EXISTS sectors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT NOT NULL,
    icon TEXT,
    image TEXT,
    "order" INTEGER
)');

$db->exec('CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sector_id INTEGER,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY(sector_id) REFERENCES sectors(id)
)');

$db->exec('CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sector_id INTEGER,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    client TEXT,
    location TEXT,
    completion_date DATE,
    image TEXT,
    is_featured BOOLEAN,
    FOREIGN KEY(sector_id) REFERENCES sectors(id)
)');

$db->exec('CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT,
    entreprise TEXT,
    secteur TEXT,
    sujet TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)');

$db->exec('CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)');

echo "Database and tables created successfully.";
?>