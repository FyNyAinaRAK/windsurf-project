<?php

$dbPath = __DIR__ . '/database.sqlite';
$db = new PDO('sqlite:' . $dbPath);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

echo "Connected to the database.\n";

// Drop tables if they exist
$db->exec("DROP TABLE IF EXISTS company_info;");
$db->exec("DROP TABLE IF EXISTS testimonials;");
$db->exec("DROP TABLE IF EXISTS news_articles;");
$db->exec("DROP TABLE IF EXISTS contact_messages;");
$db->exec("DROP TABLE IF EXISTS newsletter_subscriptions;");
$db->exec("DROP TABLE IF EXISTS sectors;");
$db->exec("DROP TABLE IF EXISTS services;");
$db->exec("DROP TABLE IF EXISTS projects;");
$db->exec("DROP TABLE IF EXISTS sector_statistics;");

echo "Dropped existing tables.\n";

// Create company_info table
$db->exec("
CREATE TABLE company_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1,
    name TEXT NOT NULL,
    description TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    facebook_url TEXT,
    linkedin_url TEXT,
    business_hours TEXT
);
");
echo "Table 'company_info' created.\n";

// Create testimonials table
$db->exec("
CREATE TABLE testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1,
    client_name TEXT NOT NULL,
    client_company TEXT,
    content TEXT,
    rating INTEGER,
    sector TEXT
);
");
echo "Table 'testimonials' created.\n";

// Create news_articles table
$db->exec("
CREATE TABLE news_articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    content TEXT,
    excerpt TEXT,
    image TEXT,
    published_date TEXT,
    is_featured INTEGER DEFAULT 0
);
");
echo "Table 'news_articles' created.\n";

// Create contact_messages table
$db->exec("
CREATE TABLE contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1,
    nom TEXT NOT NULL,
    email TEXT,
    telephone TEXT,
    entreprise TEXT,
    secteur TEXT,
    sujet TEXT,
    message TEXT,
    status TEXT DEFAULT 'nouveau',
    admin_notes TEXT
);
");
echo "Table 'contact_messages' created.\n";

// Create newsletter_subscriptions table
$db->exec("
CREATE TABLE newsletter_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1,
    email TEXT UNIQUE NOT NULL,
    nom TEXT,
    secteurs_interesse TEXT
);
");
echo "Table 'newsletter_subscriptions' created.\n";

// Create sectors table
$db->exec("
CREATE TABLE sectors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1,
    name TEXT UNIQUE NOT NULL,
    display_name TEXT,
    description TEXT,
    short_description TEXT,
    icon TEXT,
    image TEXT,
    \"order\" INTEGER,
    meta_title TEXT,
    meta_description TEXT
);
");
echo "Table 'sectors' created.\n";

// Create services table
$db->exec("
CREATE TABLE services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1,
    sector_id INTEGER,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    is_administrative INTEGER DEFAULT 0,
    \"order\" INTEGER,
    FOREIGN KEY (sector_id) REFERENCES sectors(id)
);
");
echo "Table 'services' created.\n";

// Create projects table
$db->exec("
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1,
    sector_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    client TEXT,
    location TEXT,
    completion_date TEXT,
    image TEXT,
    is_featured INTEGER DEFAULT 0,
    budget_range TEXT,
    duration TEXT,
    FOREIGN KEY (sector_id) REFERENCES sectors(id)
);
");
echo "Table 'projects' created.\n";

// Create sector_statistics table
$db->exec("
CREATE TABLE sector_statistics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1,
    sector_id INTEGER UNIQUE,
    years_experience INTEGER,
    completed_projects INTEGER,
    happy_clients INTEGER,
    team_members INTEGER,
    FOREIGN KEY (sector_id) REFERENCES sectors(id)
);
");
echo "Table 'sector_statistics' created.\n";

echo "All tables created successfully.\n";

?>
