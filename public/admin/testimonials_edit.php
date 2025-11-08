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
        $apiController->updateTestimonial($_POST);
    } else {
        $apiController->createTestimonial($_POST);
    }
    header('Location: /admin/testimonials.php');
    exit;
}

$sectors = json_decode($apiController->getSectors(), true);

$testimonial = [
    'id' => '', 'client_name' => '', 'client_company' => '', 'content' => '',
    'rating' => 5, 'sector' => ''
];

if (isset($_GET['id'])) {
    $all_testimonials = json_decode($apiController->getTestimonials(), true);
    foreach($all_testimonials as $t) {
        if ($t['id'] == $_GET['id']) {
            $testimonial = $t;
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
    <title><?php echo $testimonial['id'] ? 'Modifier' : 'Ajouter'; ?> un témoignage</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1><?php echo $testimonial['id'] ? 'Modifier' : 'Ajouter'; ?> un témoignage</h1>
            </header>
            <div class="content">
                <form method="POST" action="testimonials_edit.php">
                    <input type="hidden" name="id" value="<?php echo $testimonial['id']; ?>">
                    <div class="form-group">
                        <label for="client_name">Nom du client</label>
                        <input type="text" id="client_name" name="client_name" value="<?php echo htmlspecialchars($testimonial['client_name']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="client_company">Entreprise du client</label>
                        <input type="text" id="client_company" name="client_company" value="<?php echo htmlspecialchars($testimonial['client_company']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="content">Témoignage</label>
                        <textarea id="content" name="content" rows="5"><?php echo htmlspecialchars($testimonial['content']); ?></textarea>
                    </div>
                    <div class="form-group">
                        <label for="rating">Note</label>
                        <input type="number" id="rating" name="rating" min="1" max="5" value="<?php echo htmlspecialchars($testimonial['rating']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="sector">Secteur</label>
                        <select id="sector" name="sector">
                            <option value="">Aucun</option>
                            <?php foreach ($sectors as $sector): ?>
                                <option value="<?php echo $sector['name']; ?>" <?php echo ($testimonial['sector'] == $sector['name']) ? 'selected' : ''; ?>>
                                    <?php echo htmlspecialchars($sector['display_name']); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <button type="submit" class="btn">Enregistrer</button>
                </form>
            </div>
        </main>
    </div>
</body>
</html>
