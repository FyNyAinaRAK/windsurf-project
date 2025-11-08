<?php
session_start();

if (isset($_SESSION['is_admin']) && $_SESSION['is_admin'] === true) {
    header('Location: /admin/dashboard.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pour l'instant, le mot de passe est en dur.
    // Dans une future version, il faudra utiliser une base de données.
    if ($_POST['username'] === 'admin' && $_POST['password'] === 'password') {
        $_SESSION['is_admin'] = true;
        header('Location: /admin/dashboard.php');
        exit;
    } else {
        $error = 'Nom d\'utilisateur ou mot de passe incorrect.';
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administration - Connexion</title>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
    <div class="login-container">
        <form method="POST" action="login.php" class="login-form">
            <h1>Connexion</h1>
            <?php if ($error): ?>
                <p class="error"><?php echo $error; ?></p>
            <?php endif; ?>
            <div class="form-group">
                <label for="username">Nom d'utilisateur</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="btn">Se connecter</button>
        </form>
    </div>
</body>
</html>
