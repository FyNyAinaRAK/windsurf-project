<?php
session_start();

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /admin/login.php');
    exit;
}

require_once __DIR__ . '/../../app/controllers/ApiController.php';
$apiController = new ApiController();
$services = json_decode($apiController->getServices(), true);
$sectors = json_decode($apiController->getSectors(), true);

// Create a map of sector IDs to names for easy lookup
$sectorMap = [];
foreach ($sectors as $sector) {
    $sectorMap[$sector['id']] = $sector['display_name'];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gérer les services</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1>Services</h1>
                <a href="/admin/services_edit.php" class="btn">Ajouter un service</a>
            </header>
            <div class="content">
                <table>
                    <thead>
                        <tr>
                            <th>Nom du service</th>
                            <th>Secteur</th>
                            <th>Ordre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($services as $service): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($service['name']); ?></td>
                                <td><?php echo htmlspecialchars($sectorMap[$service['sector_id']] ?? 'N/A'); ?></td>
                                <td><?php echo htmlspecialchars($service['order']); ?></td>
                                <td>
                                    <a href="/admin/services_edit.php?id=<?php echo $service['id']; ?>">Modifier</a>
                                    <a href="/admin/services_delete.php?id=<?php echo $service['id']; ?>" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce service ?');">Supprimer</a>
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
