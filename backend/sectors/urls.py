from django.urls import path
from . import views

urlpatterns = [
    path('', views.SectorListView.as_view(), name='sector-list'),
    path('<str:name>/', views.SectorDetailView.as_view(), name='sector-detail'),
    path('projects/all/', views.ProjectListView.as_view(), name='project-list'),
    path('projects/featured/', views.FeaturedProjectListView.as_view(), name='featured-projects'),
]
