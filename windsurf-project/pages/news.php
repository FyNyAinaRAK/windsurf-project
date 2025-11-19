<?php
require_once '../includes/functions.php';
include '../includes/header.php';

$news_articles = get_news_articles();
?>

<section class="news-list">
    <h2>Actualités</h2>
    <div class="news-container">
        <?php if (!empty($news_articles)): ?>
            <?php foreach ($news_articles as $article): ?>
                <div class="news-item">
                    <h4><?php echo htmlspecialchars($article['title']); ?></h4>
                    <p><?php echo htmlspecialchars($article['excerpt']); ?></p>
                    <a href="news_detail.php?slug=<?php echo htmlspecialchars($article['slug']); ?>">Lire la suite</a>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>Aucune actualité à afficher pour le moment.</p>
        <?php endif; ?>
    </div>
</section>

<?php
include '../includes/footer.php';
?>
