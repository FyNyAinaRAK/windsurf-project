<?php
$db = new SQLite3(__DIR__ . '/database.sqlite');

$sectors = [
    ['btp', 'BTP', 'Construction, rénovation et gestion de projets de BTP.', 'Solutions complètes pour vos projets de construction.', '🏢', 'btp.jpg', 1],
    ['transport', 'Transport', 'Solutions de transport et logistique à travers Madagascar.', 'Transport de marchandises et de personnes.', '🚚', 'transport.jpg', 2],
    ['immobilier', 'Immobilier', 'Promotion immobilière, gestion de biens et transactions.', 'Achat, vente et location de biens immobiliers.', '🏠', 'immobilier.jpg', 3],
    ['communication', 'Communication', 'Stratégies de communication, marketing et publicité.', 'Agence de communication 360°. ', '📡', 'communication.jpg', 4],
    ['services', 'Services', 'Services aux entreprises et aux particuliers.', 'Une large gamme de services pour vous faciliter la vie.', '🤝', 'services.jpg', 5],
    ['security', 'Security', 'Solutions de sécurité pour les biens et les personnes.', 'Gardiennage, surveillance et systèmes de sécurité.', '🛡️', 'security.jpg', 6],
    ['import_export', 'Import/Export', 'Facilitation du commerce international.', 'Importation et exportation de marchandises.', '🌍', 'import-export.jpg', 7]
];

$stmt = $db->prepare('INSERT INTO sectors (name, display_name, description, short_description, icon, image, "order") VALUES (?, ?, ?, ?, ?, ?, ?)');

foreach ($sectors as $sector) {
    $stmt->bindValue(1, $sector[0]);
    $stmt->bindValue(2, $sector[1]);
    $stmt->bindValue(3, $sector[2]);
    $stmt->bindValue(4, $sector[3]);
    $stmt->bindValue(5, $sector[4]);
    $stmt->bindValue(6, $sector[5]);
    $stmt->bindValue(7, $sector[6]);
    $stmt->execute();
}

echo "Sectors data migrated successfully.";
?>
