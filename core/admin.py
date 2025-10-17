from django.contrib import admin
from .models import CompanyInfo, Testimonial, NewsArticle


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'is_active', 'updated_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'email']
    fieldsets = (
        ('Informations générales', {
            'fields': ('name', 'description', 'is_active')
        }),
        ('Contact', {
            'fields': ('address', 'phone', 'email', 'website', 'business_hours')
        }),
        ('Réseaux sociaux', {
            'fields': ('facebook_url', 'linkedin_url'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'client_company', 'sector', 'rating', 'is_active', 'created_at']
    list_filter = ['sector', 'rating', 'is_active', 'created_at']
    search_fields = ['client_name', 'client_company', 'content']
    list_editable = ['is_active']
    ordering = ['-created_at']


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'published_date', 'is_featured', 'is_active']
    list_filter = ['is_featured', 'is_active', 'published_date']
    search_fields = ['title', 'content']
    list_editable = ['is_featured', 'is_active']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'
    ordering = ['-published_date']
