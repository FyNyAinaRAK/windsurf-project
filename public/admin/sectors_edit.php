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
        $apiController->updateSector($_POST);
    } else {
        $apiController->createSector($_POST);
    }
    header('Location: /admin/sectors.php');
    exit;
}

$sector = [
    'id' => '', 'name' => '', 'display_name' => '', 'description' => '',
    'short_description' => '', 'icon' => '', 'image' => '', 'order' => 0,
    'meta_title' => '', 'meta_description' => ''
];

if (isset($_GET['id'])) {
    // This is a simplified way to get a single sector.
    // A dedicated method in ApiController would be better.
    $all_sectors = json_decode($apiController->getSectors(), true);
    foreach($all_sectors as $s) {
        if ($s['id'] == $_GET['id']) {
            $sector = $s;
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
    <title><?php echo $sector['id'] ? 'Modifier' : 'Ajouter'; ?> un secteur</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1><?php echo $sector['id'] ? 'Modifier' : 'Ajouter'; ?> un secteur</h1>
            </header>
            <div class="content">
                <form method="POST" action="sectors_edit.php">
                    <input type="hidden" name="id" value="<?php echo $sector['id']; ?>">
                    <div class="form-group">
                        <label for="name">Nom (slug)</label>
                        <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($sector['name']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="display_name">Nom d'affichage</label>
                        <input type="text" id="display_name" name="display_name" value="<?php echo htmlspecialchars($sector['display_name']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" rows="5"><?php echo htmlspecialchars($sector['description']); ?></textarea>
                    </div>
                    <div class="form-group">
                        <label for="short_description">Description courte</label>
                        <input type="text" id="short_description" name="short_description" value="<?php echo htmlspecialchars($sector['short_description']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="icon">Icône</label>
                        <input type="text" id="icon" name="icon" value="<?php echo htmlspecialchars($sector['icon']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="image">Image</label>
                        <input type="text" id="image" name="image" value="<?php echo htmlspecialchars($sector['image']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="order">Ordre</label>
                        <input type="number" id="order" name="order" value="<?php echo htmlspecialchars($sector['order']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="meta_title">Meta Title</label>
                        <input type="text" id="meta_title" name="meta_title" value="<?php echo htmlspecialchars($sector['meta_title']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="meta_description">Meta Description</label>
                        <input type="text" id="meta_description" name="meta_description" value="<?php echo htmlspecialchars($sector['meta_description']); ?>">
                    </div>
                    <button type="submit" class="btn">Enregistrer</button>
                </form>
            </div>
        </main>
    </div>
</body>
</html>
