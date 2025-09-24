from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    """Base model with common fields for all models"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class CompanyInfo(BaseModel):
    """Model for company information"""
    name = models.CharField(max_length=200, default="Nell'Faa Groupe Majunga")
    description = models.TextField()
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.URLField(blank=True)
    
    # Social media links
    facebook_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    
    # Business hours
    business_hours = models.TextField(
        default="Lundi - Vendredi: 8h00 - 17h00\nSamedi: 8h00 - 12h00"
    )
    
    class Meta:
        verbose_name = "Information de l'entreprise"
        verbose_name_plural = "Informations de l'entreprise"
    
    def __str__(self):
        return self.name


class Testimonial(BaseModel):
    """Model for client testimonials"""
    client_name = models.CharField(max_length=100)
    client_company = models.CharField(max_length=100, blank=True)
    content = models.TextField()
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    sector = models.CharField(
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
        blank=True
    )
    
    class Meta:
        verbose_name = "Témoignage"
        verbose_name_plural = "Témoignages"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.client_name} - {self.rating}/5"


class NewsArticle(BaseModel):
    """Model for news and updates"""
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    excerpt = models.TextField(max_length=300)
    image = models.ImageField(upload_to='news/', blank=True)
    published_date = models.DateTimeField(default=timezone.now)
    is_featured = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = "Article de presse"
        verbose_name_plural = "Articles de presse"
        ordering = ['-published_date']
    
    def __str__(self):
        return self.title
