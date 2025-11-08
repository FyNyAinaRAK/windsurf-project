<aside class="sidebar">
    <div class="sidebar-header">
        <h2>Admin</h2>
    </div>
    <nav class="sidebar-nav">
        <a href="/admin/dashboard.php" class="<?php echo (strpos($_SERVER['REQUEST_URI'], 'dashboard') !== false) ? 'active' : ''; ?>">Tableau de bord</a>
        <a href="/admin/company_info.php" class="<?php echo (strpos($_SERVER['REQUEST_URI'], 'company_info') !== false) ? 'active' : ''; ?>">Infos de l'entreprise</a>
        <a href="/admin/news.php" class="<?php echo (strpos($_SERVER['REQUEST_URI'], 'news') !== false) ? 'active' : ''; ?>">Actualités</a>
        <a href="/admin/sectors.php" class="<?php echo (strpos($_SERVER['REQUEST_URI'], 'sectors') !== false) ? 'active' : ''; ?>">Secteurs</a>
        <a href="/admin/services.php" class="<?php echo (strpos($_SERVER['REQUEST_URI'], 'services') !== false) ? 'active' : ''; ?>">Services</a>
        <a href="/admin/testimonials.php" class="<?php echo (strpos($_SERVER['REQUEST_URI'], 'testimonials') !== false) ? 'active' : ''; ?>">Témoignages</a>
        <a href="/admin/messages.php" class="<?php echo (strpos($_SERVER['REQUEST_URI'], 'messages') !== false) ? 'active' : ''; ?>">Messages</a>
        <a href="/admin/subscribers.php" class="<?php echo (strpos($_SERVER['REQUEST_URI'], 'subscribers') !== false) ? 'active' : ''; ?>">Abonnés</a>
    </nav>
    <div class="sidebar-footer">
        <a href="/admin/logout.php" class="logout-btn">Déconnexion</a>
    </div>
</aside>
