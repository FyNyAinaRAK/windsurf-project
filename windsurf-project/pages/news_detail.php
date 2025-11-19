<?php
require_once '../includes/functions.php';
include '../includes/header.php';

if (!isset($_GET['slug'])) {
    echo "Article non trouvé.";
    include '../includes/footer.php';
    exit;
}

$article = get_news_article_by_slug($_GET['slug']);

if (!$article) {
    echo "Article non trouvé.";
    include '../includes/footer.php';
    exit;
}
?>

<section class="news-detail">
    <h2><?php echo htmlspecialchars($article['title']); ?></h2>
    <p class="published-date">Publié le <?php echo date('d/m/Y', strtotime($article['published_date'])); ?></p>
    <?php if ($article['image']): ?>
        <img src="../images/<?php echo htmlspecialchars($article['image']); ?>" alt="<?php echo htmlspecialchars($article['title']); ?>">
    <?php endif; ?>
    <div class="news-content">
        <?php echo nl2br(htmlspecialchars($article['content'])); ?>
    </div>
</section>

<?php
include '../includes/footer.php';
?>
