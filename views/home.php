<?php
$apiController = new ApiController();

$sectorsJson = $apiController->getSectors();
$sectors = json_decode($sectorsJson, true);

$testimonialsJson = $apiController->getTestimonials();
$testimonials = json_decode($testimonialsJson, true);

$companyInfoJson = $apiController->getCompanyInfo();
$companyInfo = json_decode($companyInfoJson, true);

function calculateExperience() {
    return date('Y') - 2010;
}

$stats = [
    ['number' => calculateExperience(), 'label' => 'Années d\'expérience', 'description' => 'Depuis 2010'],
    ['number' => count($sectors), 'label' => 'Secteurs d\'activité', 'description' => 'Solutions complètes'],
    ['number' => '50+', 'label' => 'Employés dévoués', 'description' => 'Experts et passionnés'],
    ['number' => '100+', 'label' => 'Clients satisfaits', 'description' => 'À travers Madagascar']
];
?>

<div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <h1>Votre avenir, notre engagement.</h1>
            <p>Solutions intégrées pour un développement durable à Madagascar.</p>
            <a href="/contact" class="btn btn-primary">Nous contacter</a>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-section section">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <span class="section-subtitle">À propos de nous</span>
                    <h2 class="section-title">Votre partenaire de confiance depuis 2010</h2>
                    <p>Fondé en 2010, NELL'FAA GROUPE s'est imposé comme un acteur majeur de l'économie malgache...</p>
                    <a href="/a-propos" class="btn btn-primary">En savoir plus</a>
                </div>
                <div class="about-image">
                    <img src="https://via.placeholder.com/500" alt="Équipe Nell'Faa Groupe">
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section section">
        <div class="container">
            <div class="stats-grid">
                <?php foreach ($stats as $stat): ?>
                    <div class="stat-item">
                        <h3 class="stat-number"><?php echo $stat['number']; ?></h3>
                        <p class="stat-label"><?php echo $stat['label']; ?></p>
                        <p class="stat-description"><?php echo $stat['description']; ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services-section section">
        <div class="container">
            <h2 class="section-title">Nos Domaines d'Expertise</h2>
            <div class="services-carousel">
                <div class="services-track">
                    <?php foreach ($sectors as $sector): ?>
                        <div class="service-card">
                            <h3><?php echo htmlspecialchars($sector['display_name']); ?></h3>
                            <p><?php echo htmlspecialchars($sector['short_description']); ?></p>
                            <a href="/<?php echo htmlspecialchars($sector['name']); ?>" class="btn btn-link">En savoir plus</a>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section section">
        <div class="container">
            <h2 class="section-title">Ce que disent nos clients</h2>
            <div class="testimonials-grid">
                <?php foreach (array_slice($testimonials, 0, 3) as $testimonial): ?>
                    <div class="testimonial-card">
                        <p>"<?php echo htmlspecialchars($testimonial['content']); ?>"</p>
                        <h4><?php echo htmlspecialchars($testimonial['client_name']); ?></h4>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
</div>
