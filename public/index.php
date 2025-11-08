<?php

require_once __DIR__ . '/../app/controllers/ApiController.php';

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (strpos($requestUri, '/api/') === 0) {
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    $apiController = new ApiController();

    switch ($requestUri) {
        case '/api/company-info':
            echo $apiController->getCompanyInfo();
            break;
        case '/api/testimonials':
            echo $apiController->getTestimonials();
            break;
        case '/api/news':
            echo $apiController->getNewsArticles();
            break;
        case '/api/sectors':
            echo $apiController->getSectors();
            break;
        case '/api/services':
            echo $apiController->getServices();
            break;
        case '/api/projects':
            echo $apiController->getProjects();
            break;
        case '/api/statistics':
            echo $apiController->getStatistics();
            break;
        case (preg_match('/\/api\/news\/(\d+)/', $requestUri, $matches) ? true : false):
            echo $apiController->getNewsArticle($matches[1]);
            break;
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            break;
    }
} else {
    $view = __DIR__ . '/../views/404.php';

    switch ($requestUri) {
        case '/':
            $view = __DIR__ . '/../views/home.php';
            break;
        // Add other pages here
    }

    if (file_exists($view)) {
        require_once __DIR__ . '/../views/layout.php';
    } else {
        http_response_code(404);
        require_once __DIR__ . '/../views/404.php';
    }
}
