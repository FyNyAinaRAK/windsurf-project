<?php
session_start();

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /admin/login.php');
    exit;
}

require_once __DIR__ . '/../../app/controllers/ApiController.php';
$apiController = new ApiController();
$testimonials = json_decode($apiController->getTestimonials(), true);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gérer les témoignages</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1>Témoignages</h1>
                <a href="/admin/testimonials_edit.php" class="btn">Ajouter un témoignage</a>
            </header>
            <div class="content">
                <table>
                    <thead>
                        <tr>
                            <th>Nom du client</th>
                            <th>Entreprise</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($testimonials as $testimonial): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($testimonial['client_name']); ?></td>
                                <td><?php echo htmlspecialchars($testimonial['client_company']); ?></td>
                                <td><?php echo htmlspecialchars($testimonial['rating']); ?>/5</td>
                                <td>
                                    <a href="/admin/testimonials_edit.php?id=<?php echo $testimonial['id']; ?>">Modifier</a>
                                    <a href="/admin/testimonials_delete.php?id=<?php echo $testimonial['id']; ?>" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?');">Supprimer</a>
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
