<?php
session_start();

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /admin/login.php');
    exit;
}

require_once __DIR__ . '/../../app/controllers/ApiController.php';

if (isset($_GET['id'])) {
    $apiController = new ApiController();
    $apiController->deleteTestimonial($_GET['id']);
}

header('Location: /admin/testimonials.php');
exit;
