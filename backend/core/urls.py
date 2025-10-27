from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='api-overview'),
    path('company/', views.CompanyInfoView.as_view(), name='company'),
    path('company-info/', views.CompanyInfoListView.as_view(), name='company-info'),
    path('testimonials/', views.TestimonialListView.as_view(), name='testimonials'),
    path('news/', views.NewsArticleListView.as_view(), name='news-list'),
    path('news/<slug:slug>/', views.NewsArticleDetailView.as_view(), name='news-detail'),
]
