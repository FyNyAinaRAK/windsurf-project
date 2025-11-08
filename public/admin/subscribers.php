<?php
session_start();

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /admin/login.php');
    exit;
}

require_once __DIR__ . '/../../app/controllers/ApiController.php';
$apiController = new ApiController();
$subscribers = json_decode($apiController->getNewsletterSubscribers(), true);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Abonnés à la newsletter</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1>Abonnés à la newsletter</h1>
            </header>
            <div class="content">
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Nom</th>
                            <th>Date d'inscription</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($subscribers as $subscriber): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($subscriber['email']); ?></td>
                                <td><?php echo htmlspecialchars($subscriber['nom']); ?></td>
                                <td><?php echo htmlspecialchars($subscriber['created_at']); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</body>
</html>
