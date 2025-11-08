<?php
session_start();

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /admin/login.php');
    exit;
}

require_once __DIR__ . '/../../app/controllers/ApiController.php';
$apiController = new ApiController();
$sectors = json_decode($apiController->getSectors(), true);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gérer les secteurs d'activité</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1>Secteurs d'activité</h1>
                <a href="/admin/sectors_edit.php" class="btn">Ajouter un secteur</a>
            </header>
            <div class="content">
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Ordre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($sectors as $sector): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($sector['display_name']); ?></td>
                                <td><?php echo htmlspecialchars($sector['order']); ?></td>
                                <td>
                                    <a href="/admin/sectors_edit.php?id=<?php echo $sector['id']; ?>">Modifier</a>
                                    <a href="/admin/sectors_delete.php?id=<?php echo $sector['id']; ?>" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce secteur ?');">Supprimer</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</body>
</html>
