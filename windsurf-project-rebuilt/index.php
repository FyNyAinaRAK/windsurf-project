<?php include 'includes/header.php'; ?>
<?php include 'config.php'; ?>

<link rel="stylesheet" href="css/home.css">
<link rel="stylesheet" href="css/sectors.css">

<div class="home">
    <section class="hero-section">
        <div class="container">
            <div class="hero-content" data-aos="fade-up">
                <h1 class="hero-title">Construisons l'avenir ensemble</h1>
                <p class="hero-subtitle">Votre partenaire de confiance pour des solutions intégrées à Madagascar</p>
                <a href="contact.php" class="btn btn-primary">Nous contacter</a>
            </div>
        </div>
    </section>

    <section class="about-section section">
        <div class="container">
            <div class="about-content">
                <div class="about-text" data-aos="fade-right">
                    <span class="section-subtitle">À propos de nous</span>
                    <h2 class="section-title">Votre partenaire de confiance depuis 2010</h2>
                    <p>
                        Fondé en 2010, NELL'FAA GROUPE s'est imposé comme un acteur majeur
                        de l'économie malgache à travers ses sept pôles d'activité complémentaires.
                        Notre engagement envers l'excellence et l'innovation nous permet de proposer
                        des solutions intégrées répondant aux besoins les plus exigeants.
                    </p>
                    <a href="a-propos.php" class="btn btn-primary">En savoir plus sur nous</a>
                </div>
                <div class="about-image" data-aos="fade-left">
                    <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Équipe Nell'Faa Groupe" class="about-img"/>
                </div>
            </div>
        </div>
    </section>

    <section class="services-section section">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-subtitle">Nos Services</span>
                <h2 class="section-title">Découvrez nos domaines d'expertise</h2>
                <p class="section-description">
                    Une gamme complète de services pour répondre à tous vos besoins professionnels
                </p>
            </div>
            <div class="services-carousel">
                <div class="services-track">
                    <?php
                    $results = $db->query('SELECT * FROM sectors ORDER BY "order" ASC');
                    while ($row = $results->fetchArray()) {
                    ?>
                    <div class="service-card" data-aos="fade-up" data-aos-delay="<?php echo $row['order'] * 100; ?>">
                        <div class="service-icon"><?php echo $row['icon']; ?></div>
                        <h3><?php echo $row['display_name']; ?></h3>
                        <p><?php echo $row['short_description']; ?></p>
                        <a href="<?php echo $row['name']; ?>.php" class="btn btn-link">En savoir plus</a>
                    </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </section>

    <section class="cta-section section">
        <div class="container" data-aos="fade-up">
            <div class="cta-content">
                <h2>Prêt à démarrer votre projet avec nous ?</h2>
                <p>Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider à atteindre vos objectifs.</p>
                <a href="contact.php" class="btn btn-primary">Nous contacter</a>
            </div>
        </div>
    </section>
</div>

<?php include 'includes/footer.php'; ?>
