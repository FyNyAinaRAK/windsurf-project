<?php
session_start();

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /admin/login.php');
    exit;
}

require_once __DIR__ . '/../../app/controllers/ApiController.php';
$apiController = new ApiController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST['id'])) {
        $apiController->updateService($_POST);
    } else {
        $apiController->createService($_POST);
    }
    header('Location: /admin/services.php');
    exit;
}

$sectors = json_decode($apiController->getSectors(), true);

$service = [
    'id' => '', 'sector_id' => '', 'name' => '', 'description' => '',
    'icon' => '', 'is_administrative' => 0, 'order' => 0
];

if (isset($_GET['id'])) {
    $all_services = json_decode($apiController->getServices(), true);
    foreach($all_services as $s) {
        if ($s['id'] == $_GET['id']) {
            $service = $s;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $service['id'] ? 'Modifier' : 'Ajouter'; ?> un service</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1><?php echo $service['id'] ? 'Modifier' : 'Ajouter'; ?> un service</h1>
            </header>
            <div class="content">
                <form method="POST" action="services_edit.php">
                    <input type="hidden" name="id" value="<?php echo $service['id']; ?>">
                    <div class="form-group">
                        <label for="sector_id">Secteur</label>
                        <select id="sector_id" name="sector_id" required>
                            <?php foreach ($sectors as $sector): ?>
                                <option value="<?php echo $sector['id']; ?>" <?php echo ($service['sector_id'] == $sector['id']) ? 'selected' : ''; ?>>
                                    <?php echo htmlspecialchars($sector['display_name']); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="name">Nom du service</label>
                        <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($service['name']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" rows="5"><?php echo htmlspecialchars($service['description']); ?></textarea>
                    </div>
                    <div class="form-group">
                        <label for="icon">Icône</label>
                        <input type="text" id="icon" name="icon" value="<?php echo htmlspecialchars($service['icon']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="order">Ordre</label>
                        <input type="number" id="order" name="order" value="<?php echo htmlspecialchars($service['order']); ?>">
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="is_administrative" value="1" <?php echo $service['is_administrative'] ? 'checked' : ''; ?>>
                            Service administratif
                        </label>
                    </div>
                    <button type="submit" class="btn">Enregistrer</button>
                </form>
            </div>
        </main>
    </div>
</body>
</html>
