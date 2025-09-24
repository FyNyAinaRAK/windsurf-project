from django.db import models
from core.models import BaseModel


class Sector(BaseModel):
    """Model for business sectors"""
    SECTOR_CHOICES = [
        ('btp', 'BTP'),
        ('transport', 'Transport'),
        ('immobilier', 'Immobilier'),
        ('communication', 'Communication'),
        ('services', 'Services'),
        ('security', 'Security'),
        ('import_export', 'Import/Export'),
    ]
    
    name = models.CharField(max_length=50, choices=SECTOR_CHOICES, unique=True)
    display_name = models.CharField(max_length=100, verbose_name="Nom d'affichage")
    description = models.TextField(verbose_name="Description")
    short_description = models.CharField(max_length=200, verbose_name="Description courte")
    icon = models.CharField(max_length=10, default="🏢", verbose_name="Icône")
    image = models.ImageField(upload_to='sectors/', blank=True, verbose_name="Image")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")
    
    # SEO fields
    meta_title = models.CharField(max_length=60, blank=True, verbose_name="Titre SEO")
    meta_description = models.CharField(max_length=160, blank=True, verbose_name="Description SEO")
    
    class Meta:
        verbose_name = "Secteur"
        verbose_name_plural = "Secteurs"
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.display_name


class Service(BaseModel):
    """Model for services within each sector"""
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=200, verbose_name="Nom du service")
    description = models.TextField(verbose_name="Description")
    icon = models.CharField(max_length=10, blank=True, verbose_name="Icône")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")
    
    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"
        ordering = ['sector', 'order', 'name']
    
    def __str__(self):
        return f"{self.sector.display_name} - {self.name}"


class Project(BaseModel):
    """Model for completed projects"""
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=200, verbose_name="Titre du projet")
    description = models.TextField(verbose_name="Description")
    client = models.CharField(max_length=100, blank=True, verbose_name="Client")
    location = models.CharField(max_length=100, blank=True, verbose_name="Localisation")
    completion_date = models.DateField(verbose_name="Date de réalisation")
    image = models.ImageField(upload_to='projects/', blank=True, verbose_name="Image")
    is_featured = models.BooleanField(default=False, verbose_name="Projet vedette")
    
    # Project details
    budget_range = models.CharField(max_length=50, blank=True, verbose_name="Fourchette budget")
    duration = models.CharField(max_length=50, blank=True, verbose_name="Durée")
    
    class Meta:
        verbose_name = "Projet"
        verbose_name_plural = "Projets"
        ordering = ['-completion_date']
    
    def __str__(self):
        return f"{self.title} ({self.sector.display_name})"


class SectorStatistic(BaseModel):
    """Model for sector statistics"""
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE, related_name='statistics')
    label = models.CharField(max_length=100, verbose_name="Libellé")
    value = models.CharField(max_length=20, verbose_name="Valeur")
    unit = models.CharField(max_length=20, blank=True, verbose_name="Unité")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")
    
    class Meta:
        verbose_name = "Statistique secteur"
        verbose_name_plural = "Statistiques secteurs"
        ordering = ['sector', 'order']
    
    def __str__(self):
        return f"{self.sector.display_name} - {self.label}: {self.value}{self.unit}"
