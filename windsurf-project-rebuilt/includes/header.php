<?php
$current_page = basename($_SERVER['SCRIPT_NAME']);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nell'Faa Groupe</title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/aos.css">
</head>
<body>
<header class="header">
      <div class="container">
        <div class="header-content">
          <a href="index.php" class="logo">
            <img src="images/logo/nellfaa-logo.png" alt="Nell'Faa Groupe Logo" class="logo-image" />
            <div class="logo-text">
              <h1>NELL'FAA</h1>
              <span>GROUPE</span>
            </div>
          </a>

          <nav class="nav">
            <a href="index.php" class="nav-link <?php echo ($current_page == 'index.php') ? 'active' : ''; ?>">Accueil</a>

            <div class="dropdown">
              <button type="button" class="nav-link">
                Nos Secteurs
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="dropdown-menu">
                <a href="btp.php" class="dropdown-item">BTP</a>
                <a href="transport.php" class="dropdown-item">Transport</a>
                <a href="immobilier.php" class="dropdown-item">Immobilier</a>
                <a href="communication.php" class="dropdown-item">Communication</a>
                <a href="services.php" class="dropdown-item">Services</a>
                <a href="security.php" class="dropdown-item">Security</a>
                <a href="import-export.php" class="dropdown-item">Import/Export</a>
              </div>
            </div>

            <a href="actualites.php" class="nav-link <?php echo ($current_page == 'actualites.php') ? 'active' : ''; ?>">Actualités</a>
            <a href="a-propos.php" class="nav-link <?php echo ($current_page == 'a-propos.php') ? 'active' : ''; ?>">À Propos</a>
            <a href="contact.php" class="nav-link <?php echo ($current_page == 'contact.php') ? 'active' : ''; ?>">Contact</a>
          </nav>

          <button class="menu-toggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
    <main>
