<?php
require_once '../includes/functions.php';
include '../includes/header.php';

if (!isset($_GET['name'])) {
    echo "Secteur non trouvé.";
    include '../includes/footer.php';
    exit;
}

$sector = get_sector_by_name($_GET['name']);

if (!$sector) {
    echo "Secteur non trouvé.";
    include '../includes/footer.php';
    exit;
}

$services = get_services_by_sector($sector['id']);
$projects = get_projects_by_sector($sector['id']);
?>

<section class="sector-detail">
    <h2><?php echo htmlspecialchars($sector['display_name']); ?></h2>
    <p><?php echo nl2br(htmlspecialchars($sector['description'])); ?></p>

    <?php if (!empty($services)): ?>
        <h3>Nos services</h3>
        <ul>
            <?php foreach ($services as $service): ?>
                <li><?php echo htmlspecialchars($service['name']); ?></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <?php if (!empty($projects)): ?>
        <h3>Nos projets</h3>
        <div class="projects-container">
            <?php foreach ($projects as $project): ?>
                <div class="project-item">
                    <h4><?php echo htmlspecialchars($project['title']); ?></h4>
                    <p><?php echo htmlspecialchars($project['description']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>

<?php
include '../includes/footer.php';
?>
