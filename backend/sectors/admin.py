from django.contrib import admin
from .models import Sector, Service, Project, SectorStatistic


class ServiceInline(admin.TabularInline):
    model = Service
    extra = 1
    fields = ['name', 'description', 'icon', 'is_administrative', 'order', 'is_active']


class SectorStatisticInline(admin.TabularInline):
    model = SectorStatistic
    extra = 1
    fields = ['label', 'value', 'unit', 'order', 'is_active']


@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ['display_name', 'name', 'order', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['display_name', 'description']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'name']
    inlines = [ServiceInline, SectorStatisticInline]
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('name', 'display_name', 'icon', 'order', 'is_active')
        }),
        ('Contenu', {
            'fields': ('description', 'short_description', 'image')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'sector', 'order', 'is_active']
    list_filter = ['sector', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['order', 'is_active']
    ordering = ['sector', 'order', 'name']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'sector', 'client', 'completion_date', 'is_featured', 'is_active']
    list_filter = ['sector', 'is_featured', 'is_active', 'completion_date']
    search_fields = ['title', 'description', 'client']
    list_editable = ['is_featured', 'is_active']
    date_hierarchy = 'completion_date'
    ordering = ['-completion_date']
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('sector', 'title', 'description', 'image', 'is_featured', 'is_active')
        }),
        ('Détails du projet', {
            'fields': ('client', 'location', 'completion_date', 'budget_range', 'duration')
        }),
    )


@admin.register(SectorStatistic)
class SectorStatisticAdmin(admin.ModelAdmin):
    list_display = ['sector', 'label', 'value', 'unit', 'order', 'is_active']
    list_filter = ['sector', 'is_active']
    search_fields = ['label', 'value']
    list_editable = ['order', 'is_active']
    ordering = ['sector', 'order']
