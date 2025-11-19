<?php
// header.php
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Windsurf Project</title>
    <link rel="stylesheet" href="/css/style.css?v=<?php echo time(); ?>">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body>
    <header>
        <h1><a href="/index.php">Windsurf Project</a></h1>
        <nav>
            <ul>
                <li><a href="/index.php">Accueil</a></li>
                <li><a href="/pages/about.php">À propos</a></li>
                <li class="dropdown">
                    <a href="#">Secteurs</a>
                    <ul class="dropdown-content">
                        <?php
                        require_once 'functions.php';
                        $sectors = get_sectors();
                        if (!empty($sectors)) {
                            foreach ($sectors as $sector) {
                                echo '<li><a href="/pages/sector.php?name=' . htmlspecialchars($sector['name']) . '">' . htmlspecialchars($sector['display_name']) . '</a></li>';
                            }
                        }
                        ?>
                    </ul>
                </li>
                <li><a href="/pages/news.php">Actualités</a></li>
                <li><a href="/pages/contact.php">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
