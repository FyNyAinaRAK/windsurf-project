from django.contrib import admin
from .models import ContactMessage, NewsletterSubscription


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['nom', 'email', 'secteur', 'status', 'created_at']
    list_filter = ['status', 'secteur', 'created_at']
    search_fields = ['nom', 'email', 'entreprise', 'sujet', 'message']
    list_editable = ['status']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Informations du contact', {
            'fields': ('nom', 'email', 'telephone', 'entreprise')
        }),
        ('Demande', {
            'fields': ('secteur', 'sujet', 'message')
        }),
        ('Gestion', {
            'fields': ('status', 'admin_notes', 'is_active')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['email', 'nom', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['email', 'nom']
    list_editable = ['is_active']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
