<?php
require_once '../includes/functions.php';
include '../includes/header.php';

$company_info = get_company_info();
?>

<section class="about-us">
    <h2>À propos de nous</h2>
    <?php if ($company_info): ?>
        <p><?php echo nl2br(htmlspecialchars($company_info['description'])); ?></p>
        <h3>Nos coordonnées</h3>
        <p><strong>Adresse :</strong> <?php echo htmlspecialchars($company_info['address']); ?></p>
        <p><strong>Téléphone :</strong> <?php echo htmlspecialchars($company_info['phone']); ?></p>
        <p><strong>Email :</strong> <?php echo htmlspecialchars($company_info['email']); ?></p>
    <?php else: ?>
        <p>Informations sur l'entreprise non disponibles.</p>
    <?php endif; ?>
</section>

<?php
include '../includes/footer.php';
?>
