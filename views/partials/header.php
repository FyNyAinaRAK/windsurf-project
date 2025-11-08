<header class="header">
    <div class="container">
        <div class="header-content">
            <a href="/" class="logo">
                <img src="/images/logo/nellfaa-logo.png" alt="Nell'Faa Groupe Logo" class="logo-image">
                <div class="logo-text">
                    <h1>NELL'FAA</h1>
                    <span>GROUPE</span>
                </div>
            </a>

            <nav class="nav">
                <a href="/" class="nav-link <?php echo ($_SERVER['REQUEST_URI'] === '/') ? 'active' : ''; ?>">Accueil</a>

                <div class="dropdown">
                    <button type="button" class="nav-link" onclick="toggleSectors()">
                        Nos Secteurs
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <div class="dropdown-menu">
                        <a href="/btp" class="dropdown-item">BTP</a>
                        <a href="/transport" class="dropdown-item">Transport</a>
                        <a href="/immobilier" class="dropdown-item">Immobilier</a>
                        <a href="/communication" class="dropdown-item">Communication</a>
                        <a href="/services" class="dropdown-item">Services</a>
                        <a href="/security" class="dropdown-item">Security</a>
                        <a href="/import-export" class="dropdown-item">Import/Export</a>
                    </div>
                </div>

                <a href="/actualites" class="nav-link <?php echo (strpos($_SERVER['REQUEST_URI'], '/actualites') !== false) ? 'active' : ''; ?>">Actualités</a>
                <a href="/a-propos" class="nav-link <?php echo ($_SERVER['REQUEST_URI'] === '/a-propos') ? 'active' : ''; ?>">À Propos</a>
                <a href="/contact" class="nav-link <?php echo ($_SERVER['REQUEST_URI'] === '/contact') ? 'active' : ''; ?>">Contact</a>
            </nav>

            <button class="menu-toggle" onclick="toggleMenu()" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</header>
