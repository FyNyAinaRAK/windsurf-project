<?php
session_start();

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /admin/login.php');
    exit;
}

require_once __DIR__ . '/../../app/controllers/ApiController.php';
$apiController = new ApiController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $apiController->updateCompanyInfo($_POST);
    header('Location: /admin/company_info.php');
    exit;
}

$companyInfo = json_decode($apiController->getCompanyInfo(), true);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gérer les informations de l'entreprise</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1>Informations de l'entreprise</h1>
            </header>
            <div class="content">
                <form method="POST" action="company_info.php">
                    <div class="form-group">
                        <label for="name">Nom</label>
                        <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($companyInfo['name']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" name="description"><?php echo htmlspecialchars($companyInfo['description']); ?></textarea>
                    </div>
                    <div class="form-group">
                        <label for="address">Adresse</label>
                        <input type="text" id="address" name="address" value="<?php echo htmlspecialchars($companyInfo['address']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="phone">Téléphone</label>
                        <input type="text" id="phone" name="phone" value="<?php echo htmlspecialchars($companyInfo['phone']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($companyInfo['email']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="website">Site web</label>
                        <input type="url" id="website" name="website" value="<?php echo htmlspecialchars($companyInfo['website']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="facebook_url">Facebook</label>
                        <input type="url" id="facebook_url" name="facebook_url" value="<?php echo htmlspecialchars($companyInfo['facebook_url']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="linkedin_url">LinkedIn</label>
                        <input type="url" id="linkedin_url" name="linkedin_url" value="<?php echo htmlspecialchars($companyInfo['linkedin_url']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="business_hours">Horaires</label>
                        <textarea id="business_hours" name="business_hours"><?php echo htmlspecialchars($companyInfo['business_hours']); ?></textarea>
                    </div>
                    <button type="submit" class="btn">Mettre à jour</button>
                </form>
            </div>
        </main>
    </div>
</body>
</html>
