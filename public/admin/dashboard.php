<?php
session_start();

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /admin/login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tableau de bord - Administration</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1>Tableau de bord</h1>
            </header>
            <div class="content">
                <p>Bienvenue sur le tableau de bord de votre site.</p>
                <p>Utilisez le menu sur la gauche pour gérer le contenu de votre site.</p>
            </div>
        </main>
    </div>
</body>
</html>
