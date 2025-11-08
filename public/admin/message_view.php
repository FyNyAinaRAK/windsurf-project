<?php
session_start();

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /admin/login.php');
    exit;
}

require_once __DIR__ . '/../../app/controllers/ApiController.php';
$apiController = new ApiController();
$message = null;
if (isset($_GET['id'])) {
    $messages = json_decode($apiController->getContactMessages(), true);
    foreach ($messages as $m) {
        if ($m['id'] == $_GET['id']) {
            $message = $m;
            break;
        }
    }
}

if (!$message) {
    die('Message non trouvé.');
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voir le message</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1>Détail du message</h1>
                <a href="/admin/messages.php">Retour à la liste</a>
            </header>
            <div class="content">
                <p><strong>Nom:</strong> <?php echo htmlspecialchars($message['nom']); ?></p>
                <p><strong>Email:</strong> <?php echo htmlspecialchars($message['email']); ?></p>
                <p><strong>Téléphone:</strong> <?php echo htmlspecialchars($message['telephone']); ?></p>
                <p><strong>Entreprise:</strong> <?php echo htmlspecialchars($message['entreprise']); ?></p>
                <p><strong>Secteur:</strong> <?php echo htmlspecialchars($message['secteur']); ?></p>
                <p><strong>Sujet:</strong> <?php echo htmlspecialchars($message['sujet']); ?></p>
                <p><strong>Message:</strong></p>
                <pre><?php echo htmlspecialchars($message['message']); ?></pre>
            </div>
        </main>
    </div>
</body>
</html>
