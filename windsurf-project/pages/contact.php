<?php
require_once '../includes/functions.php';
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'nom' => $_POST['nom'] ?? '',
        'email' => $_POST['email'] ?? '',
        'telephone' => $_POST['telephone'] ?? '',
        'entreprise' => $_POST['entreprise'] ?? '',
        'secteur' => $_POST['secteur'] ?? '',
        'sujet' => $_POST['sujet'] ?? '',
        'message' => $_POST['message'] ?? '',
    ];

    if (save_contact_message($data)) {
        $message = "Votre message a bien été envoyé.";
    } else {
        $message = "Une erreur s'est produite. Veuillez réessayer.";
    }
}

include '../includes/header.php';
?>

<section class="contact-form">
    <h2>Contactez-nous</h2>
    <?php if ($message): ?>
        <p><?php echo $message; ?></p>
    <?php endif; ?>
    <form action="contact.php" method="post">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" name="nom" required>

        <label for="email">Email :</label>
        <input type="email" id="email" name="email" required>

        <label for="telephone">Téléphone :</label>
        <input type="text" id="telephone" name="telephone">

        <label for="entreprise">Entreprise :</label>
        <input type="text" id="entreprise" name="entreprise">

        <label for="secteur">Secteur :</label>
        <input type="text" id="secteur" name="secteur">

        <label for="sujet">Sujet :</label>
        <input type="text" id="sujet" name="sujet">

        <label for="message">Message :</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">Envoyer</button>
    </form>
</section>

<?php
include '../includes/footer.php';
?>
