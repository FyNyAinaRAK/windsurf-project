<?php
require_once 'includes/functions.php';
include 'includes/header.php';

$company_info = get_company_info();
$testimonials = get_testimonials(3);
$featured_news = get_featured_news_articles(3);
?>

<section class="hero" data-aos="fade-in">
    <h2><?php echo htmlspecialchars($company_info['name'] ?? 'Windsurf Project'); ?></h2>
    <p><?php echo htmlspecialchars($company_info['description'] ?? 'Le meilleur spot de windsurf de la région !'); ?></p>
</section>

<section class="featured-news" data-aos="fade-up">
    <h3>Dernières actualités</h3>
    <div class="news-container">
        <?php if (!empty($featured_news)): ?>
            <?php foreach ($featured_news as $article): ?>
                <div class="news-item" data-aos="fade-up" data-aos-delay="200">
                    <h4><?php echo htmlspecialchars($article['title']); ?></h4>
                    <p><?php echo htmlspecialchars($article['excerpt']); ?></p>
                    <a href="pages/news.php?slug=<?php echo htmlspecialchars($article['slug']); ?>">Lire la suite</a>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>Aucune actualité à afficher pour le moment.</p>
        <?php endif; ?>
    </div>
</section>

<section class="testimonials">
    <h3>Témoignages</h3>
    <div class="testimonials-container">
        <?php if (!empty($testimonials)): ?>
            <?php foreach ($testimonials as $testimonial): ?>
                <div class="testimonial-item">
                    <blockquote><?php echo htmlspecialchars($testimonial['content']); ?></blockquote>
                    <cite>- <?php echo htmlspecialchars($testimonial['client_name']); ?></cite>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>Aucun témoignage à afficher pour le moment.</p>
        <?php endif; ?>
    </div>
</section>

<?php
include 'includes/footer.php';
?>
