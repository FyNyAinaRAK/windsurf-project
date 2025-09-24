from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import CompanyInfo, Testimonial, NewsArticle
from .serializers import (
    CompanyInfoSerializer, 
    TestimonialSerializer, 
    NewsArticleSerializer,
    NewsArticleListSerializer
)


@api_view(['GET'])
def api_overview(request):
    """API overview endpoint"""
    api_urls = {
        'Company Info': '/api/company-info/',
        'Testimonials': '/api/testimonials/',
        'News Articles': '/api/news/',
        'Contacts': '/api/contacts/',
        'Sectors': '/api/sectors/',
    }
    return Response(api_urls)


class CompanyInfoListView(generics.ListAPIView):
    """Get company information"""
    queryset = CompanyInfo.objects.filter(is_active=True)
    serializer_class = CompanyInfoSerializer


class TestimonialListView(generics.ListAPIView):
    """List all active testimonials"""
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['sector', 'rating']
    search_fields = ['client_name', 'client_company', 'content']
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']


class NewsArticleListView(generics.ListAPIView):
    """List all published news articles"""
    queryset = NewsArticle.objects.filter(is_active=True)
    serializer_class = NewsArticleListSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['is_featured']
    search_fields = ['title', 'content']
    ordering_fields = ['published_date']
    ordering = ['-published_date']


class NewsArticleDetailView(generics.RetrieveAPIView):
    """Get single news article by slug"""
    queryset = NewsArticle.objects.filter(is_active=True)
    serializer_class = NewsArticleSerializer
    lookup_field = 'slug'
