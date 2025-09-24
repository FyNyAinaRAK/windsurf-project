from django.db import models
from core.models import BaseModel


class ContactMessage(BaseModel):
    """Model for contact form submissions"""
    nom = models.CharField(max_length=100, verbose_name="Nom complet")
    email = models.EmailField(verbose_name="Email")
    telephone = models.CharField(max_length=20, blank=True, verbose_name="Téléphone")
    entreprise = models.CharField(max_length=100, blank=True, verbose_name="Entreprise")
    secteur = models.CharField(
        max_length=50,
        choices=[
            ('btp', 'BTP'),
            ('transport', 'Transport'),
            ('immobilier', 'Immobilier'),
            ('communication', 'Communication'),
            ('services', 'Services'),
            ('security', 'Security'),
            ('import_export', 'Import/Export'),
        ],
        blank=True,
        verbose_name="Secteur d'intérêt"
    )
    sujet = models.CharField(max_length=200, blank=True, verbose_name="Sujet")
    message = models.TextField(verbose_name="Message")
    
    # Status tracking
    STATUS_CHOICES = [
        ('nouveau', 'Nouveau'),
        ('en_cours', 'En cours de traitement'),
        ('traite', 'Traité'),
        ('ferme', 'Fermé'),
    ]
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='nouveau',
        verbose_name="Statut"
    )
    
    # Admin notes
    admin_notes = models.TextField(blank=True, verbose_name="Notes administrateur")
    
    class Meta:
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.nom} - {self.sujet or 'Sans sujet'}"


class NewsletterSubscription(BaseModel):
    """Model for newsletter subscriptions"""
    email = models.EmailField(unique=True, verbose_name="Email")
    nom = models.CharField(max_length=100, blank=True, verbose_name="Nom")
    secteurs_interesse = models.JSONField(
        default=list, 
        blank=True,
        verbose_name="Secteurs d'intérêt"
    )
    
    class Meta:
        verbose_name = "Abonnement newsletter"
        verbose_name_plural = "Abonnements newsletter"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.email} - {self.nom or 'Anonyme'}"
