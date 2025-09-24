"""
URL configuration for nellfaa_backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.http import JsonResponse

def api_health_check(request):
    return JsonResponse({'status': 'ok', 'message': 'Nell\'Faa API is running'})

urlpatterns = [
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/contacts/', include('contacts.urls')),
    path('api/sectors/', include('sectors.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Admin site customization
admin.site.site_header = "Nell'Faa Groupe Administration"
admin.site.site_title = "Nell'Faa Admin"
admin.site.index_title = "Bienvenue dans l'administration Nell'Faa"
