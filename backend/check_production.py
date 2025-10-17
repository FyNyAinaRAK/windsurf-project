#!/usr/bin/env python
"""
Script de vérification de la configuration de production
À exécuter avant le déploiement : python check_production.py
"""

import os
import sys
from pathlib import Path
from decouple import config

# Couleurs pour le terminal
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def print_success(message):
    print(f"{Colors.GREEN}✓ {message}{Colors.END}")

def print_error(message):
    print(f"{Colors.RED}✗ {message}{Colors.END}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠ {message}{Colors.END}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ {message}{Colors.END}")

def check_secret_key():
    """Vérifier que SECRET_KEY est sécurisée"""
    print("\n1. Vérification de SECRET_KEY...")
    secret_key = config('SECRET_KEY', default='')
    
    if not secret_key:
        print_error("SECRET_KEY n'est pas définie")
        return False
    
    if 'django-insecure' in secret_key or 'change-me' in secret_key:
        print_error("SECRET_KEY utilise une valeur par défaut non sécurisée")
        print_info("Générez une nouvelle clé avec: python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'")
        return False
    
    if len(secret_key) < 50:
        print_warning("SECRET_KEY semble trop courte (< 50 caractères)")
        return False
    
    print_success("SECRET_KEY est correctement configurée")
    return True

def check_debug():
    """Vérifier que DEBUG est False en production"""
    print("\n2. Vérification de DEBUG...")
    debug = config('DEBUG', default=True, cast=bool)
    
    if debug:
        print_error("DEBUG est activé (True) - DANGEREUX EN PRODUCTION!")
        print_info("Définissez DEBUG=False dans votre fichier .env")
        return False
    
    print_success("DEBUG est désactivé")
    return True

def check_allowed_hosts():
    """Vérifier ALLOWED_HOSTS"""
    print("\n3. Vérification de ALLOWED_HOSTS...")
    allowed_hosts = config('ALLOWED_HOSTS', default='*')
    
    if allowed_hosts == '*':
        print_warning("ALLOWED_HOSTS accepte tous les domaines (*)")
        print_info("Spécifiez vos domaines: ALLOWED_HOSTS=votre-domaine.com,www.votre-domaine.com")
        return False
    
    if 'localhost' in allowed_hosts or '127.0.0.1' in allowed_hosts:
        print_warning("ALLOWED_HOSTS contient localhost/127.0.0.1")
    
    print_success(f"ALLOWED_HOSTS configuré: {allowed_hosts}")
    return True

def check_database():
    """Vérifier la configuration de la base de données"""
    print("\n4. Vérification de DATABASE_URL...")
    database_url = config('DATABASE_URL', default='')
    
    if not database_url:
        print_error("DATABASE_URL n'est pas définie")
        return False
    
    if 'sqlite' in database_url.lower():
        print_warning("Utilisation de SQLite - PostgreSQL recommandé pour la production")
        return False
    
    if 'postgresql' in database_url.lower() or 'postgres' in database_url.lower():
        print_success("PostgreSQL configuré")
        return True
    
    print_warning(f"Type de base de données non reconnu: {database_url[:20]}...")
    return False

def check_cors():
    """Vérifier la configuration CORS"""
    print("\n5. Vérification de CORS...")
    cors_origins = config('CORS_ALLOWED_ORIGINS', default='')
    
    if not cors_origins:
        print_warning("CORS_ALLOWED_ORIGINS n'est pas défini")
        print_info("Définissez les origines autorisées dans .env")
        return False
    
    if 'localhost' in cors_origins:
        print_warning("CORS_ALLOWED_ORIGINS contient localhost")
    
    print_success(f"CORS configuré: {cors_origins}")
    return True

def check_csrf():
    """Vérifier la configuration CSRF"""
    print("\n6. Vérification de CSRF...")
    csrf_origins = config('CSRF_TRUSTED_ORIGINS', default='')
    
    if not csrf_origins:
        print_warning("CSRF_TRUSTED_ORIGINS n'est pas défini")
        return False
    
    print_success(f"CSRF configuré: {csrf_origins}")
    return True

def check_email():
    """Vérifier la configuration email"""
    print("\n7. Vérification de la configuration Email...")
    email_backend = config('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
    
    if 'console' in email_backend.lower():
        print_warning("Email backend utilise console (emails non envoyés)")
        print_info("Configurez un backend SMTP pour la production")
        return False
    
    email_host = config('EMAIL_HOST', default='')
    email_user = config('EMAIL_HOST_USER', default='')
    
    if not email_host or not email_user:
        print_error("Configuration email incomplète")
        return False
    
    print_success(f"Email configuré avec {email_host}")
    return True

def check_security_settings():
    """Vérifier les paramètres de sécurité"""
    print("\n8. Vérification des paramètres de sécurité...")
    
    checks = {
        'SECURE_SSL_REDIRECT': config('SECURE_SSL_REDIRECT', default=False, cast=bool),
        'SESSION_COOKIE_SECURE': config('SESSION_COOKIE_SECURE', default=False, cast=bool),
        'CSRF_COOKIE_SECURE': config('CSRF_COOKIE_SECURE', default=False, cast=bool),
    }
    
    all_secure = True
    for setting, value in checks.items():
        if not value:
            print_warning(f"{setting} est désactivé")
            all_secure = False
        else:
            print_success(f"{setting} est activé")
    
    return all_secure

def check_static_files():
    """Vérifier la configuration des fichiers statiques"""
    print("\n9. Vérification des fichiers statiques...")
    
    base_dir = Path(__file__).resolve().parent
    staticfiles_dir = base_dir / 'staticfiles'
    
    if not staticfiles_dir.exists():
        print_warning("Dossier staticfiles n'existe pas")
        print_info("Exécutez: python manage.py collectstatic")
        return False
    
    if not any(staticfiles_dir.iterdir()):
        print_warning("Dossier staticfiles est vide")
        print_info("Exécutez: python manage.py collectstatic")
        return False
    
    print_success("Fichiers statiques collectés")
    return True

def check_requirements():
    """Vérifier que requirements.txt existe"""
    print("\n10. Vérification de requirements.txt...")
    
    base_dir = Path(__file__).resolve().parent
    requirements_file = base_dir / 'requirements.txt'
    
    if not requirements_file.exists():
        print_error("requirements.txt n'existe pas")
        return False
    
    with open(requirements_file, 'r') as f:
        content = f.read()
        required_packages = ['Django', 'djangorestframework', 'gunicorn', 'whitenoise']
        missing = [pkg for pkg in required_packages if pkg.lower() not in content.lower()]
        
        if missing:
            print_error(f"Packages manquants dans requirements.txt: {', '.join(missing)}")
            return False
    
    print_success("requirements.txt est complet")
    return True

def main():
    """Fonction principale"""
    print(f"\n{Colors.BLUE}{'='*60}")
    print("  Vérification de Configuration Production - Nell'Faa Groupe")
    print(f"{'='*60}{Colors.END}\n")
    
    checks = [
        check_secret_key,
        check_debug,
        check_allowed_hosts,
        check_database,
        check_cors,
        check_csrf,
        check_email,
        check_security_settings,
        check_static_files,
        check_requirements,
    ]
    
    results = []
    for check in checks:
        try:
            results.append(check())
        except Exception as e:
            print_error(f"Erreur lors de la vérification: {str(e)}")
            results.append(False)
    
    # Résumé
    print(f"\n{Colors.BLUE}{'='*60}")
    print("  RÉSUMÉ")
    print(f"{'='*60}{Colors.END}\n")
    
    passed = sum(results)
    total = len(results)
    percentage = (passed / total) * 100
    
    print(f"Vérifications réussies: {passed}/{total} ({percentage:.0f}%)")
    
    if percentage == 100:
        print_success("\n✓ Votre application est PRÊTE pour la production!")
    elif percentage >= 70:
        print_warning("\n⚠ Votre application est PRESQUE prête pour la production")
        print_info("Corrigez les avertissements ci-dessus avant le déploiement")
    else:
        print_error("\n✗ Votre application N'EST PAS prête pour la production")
        print_info("Corrigez les erreurs critiques avant le déploiement")
    
    print(f"\n{Colors.BLUE}{'='*60}{Colors.END}\n")
    
    return 0 if percentage == 100 else 1

if __name__ == '__main__':
    sys.exit(main())
