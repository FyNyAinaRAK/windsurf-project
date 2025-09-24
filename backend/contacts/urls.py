from django.urls import path
from . import views

urlpatterns = [
    path('submit/', views.ContactMessageCreateView.as_view(), name='contact-submit'),
    path('newsletter/', views.NewsletterSubscriptionCreateView.as_view(), name='newsletter-subscribe'),
]
