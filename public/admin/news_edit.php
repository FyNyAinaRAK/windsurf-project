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
        $apiController->updateNewsArticle($_POST);
    } else {
        $apiController->createNewsArticle($_POST);
    }
    header('Location: /admin/news.php');
    exit;
}

$article = [
    'id' => '', 'title' => '', 'slug' => '', 'content' => '',
    'excerpt' => '', 'image' => '', 'published_date' => date('Y-m-d H:i:s'),
    'is_featured' => 0
];

if (isset($_GET['id'])) {
    $article = json_decode($apiController->getNewsArticle($_GET['id']), true);
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $article['id'] ? 'Modifier' : 'Ajouter'; ?> un article</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="dashboard-container">
        <?php include __DIR__ . '/../partials/admin_sidebar.php'; ?>
        <main class="main-content">
            <header class="main-header">
                <h1><?php echo $article['id'] ? 'Modifier' : 'Ajouter'; ?> un article</h1>
            </header>
            <div class="content">
                <form method="POST" action="news_edit.php">
                    <input type="hidden" name="id" value="<?php echo $article['id']; ?>">
                    <div class="form-group">
                        <label for="title">Titre</label>
                        <input type="text" id="title" name="title" value="<?php echo htmlspecialchars($article['title']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="slug">Slug</label>
                        <input type="text" id="slug" name="slug" value="<?php echo htmlspecialchars($article['slug']); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="content">Contenu</label>
                        <textarea id="content" name="content" rows="10"><?php echo htmlspecialchars($article['content']); ?></textarea>
                    </div>
                    <div class="form-group">
                        <label for="excerpt">Extrait</label>
                        <textarea id="excerpt" name="excerpt"><?php echo htmlspecialchars($article['excerpt']); ?></textarea>
                    </div>
                    <div class="form-group">
                        <label for="image">Image</label>
                        <input type="text" id="image" name="image" value="<?php echo htmlspecialchars($article['image']); ?>">
                    </div>
                    <div class="form-group">
                        <label for="published_date">Date de publication</label>
                        <input type="datetime-local" id="published_date" name="published_date" value="<?php echo date('Y-m-d\TH:i', strtotime($article['published_date'])); ?>">
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="is_featured" value="1" <?php echo $article['is_featured'] ? 'checked' : ''; ?>>
                            En vedette
                        </label>
                    </div>
                    <button type="submit" class="btn">Enregistrer</button>
                </form>
            </div>
        </main>
    </div>
</body>
</html>
