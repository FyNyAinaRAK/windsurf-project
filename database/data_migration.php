<?php

$oldDbPath = __DIR__ . '/../backend/db.sqlite3';
$newDbPath = __DIR__ . '/database.sqlite';

if (!file_exists($oldDbPath)) {
    die("Error: The old database file does not exist at '{$oldDbPath}'.\n");
}

try {
    $oldDb = new PDO('sqlite:' . $oldDbPath);
    $oldDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $newDb = new PDO('sqlite:' . $newDbPath);
    $newDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Connected to both databases successfully.\n";

    // Truncate tables before inserting new data
    $newDb->exec("DELETE FROM company_info;");
    $newDb->exec("DELETE FROM testimonials;");
    $newDb->exec("DELETE FROM news_articles;");
    $newDb->exec("DELETE FROM contact_messages;");
    $newDb->exec("DELETE FROM newsletter_subscriptions;");
    $newDb->exec("DELETE FROM sectors;");
    $newDb->exec("DELETE FROM services;");
    $newDb->exec("DELETE FROM projects;");

    echo "Truncated all tables in the new database.\n";

    // Migrate data for each table
    $tables = [
        'core_companyinfo' => 'company_info',
        'core_testimonial' => 'testimonials',
        'core_newsarticle' => 'news_articles',
        'contacts_contactmessage' => 'contact_messages',
        'contacts_newslettersubscription' => 'newsletter_subscriptions',
        'sectors_sector' => 'sectors',
        'sectors_service' => 'services',
        'sectors_project' => 'projects',
    ];

    foreach ($tables as $oldTable => $newTable) {
        $stmt = $oldDb->query("SELECT * FROM {$oldTable}");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($rows)) {
            echo "No data found in '{$oldTable}'.\n";
            continue;
        }

        $columns = array_keys($rows[0]);
        $quotedColumns = array_map(function($col) {
            return '"' . $col . '"';
        }, $columns);

        $newStmt = $newDb->prepare("INSERT INTO {$newTable} (" . implode(', ', $quotedColumns) . ") VALUES (" . implode(', ', array_fill(0, count($columns), '?')) . ")");

        foreach ($rows as $row) {
            $newStmt->execute(array_values($row));

            // Handle image migration
            if (isset($row['image'])) {
                $sourcePath = __DIR__ . '/../backend/media/' . $row['image'];
                $destinationPath = __DIR__ . '/../public/images/' . basename($row['image']);

                if (file_exists($sourcePath)) {
                    copy($sourcePath, $destinationPath);
                }
            }
        }
        echo "Migrated " . count($rows) . " rows from '{$oldTable}' to '{$newTable}'.\n";
    }

    echo "Data migration completed successfully!\n";

} catch (PDOException $e) {
    die("Database error: " . $e->getMessage() . "\n");
}

?>
