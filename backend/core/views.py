from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import CompanyInfo, Testimonial, NewsArticle
from .serializers import (
    CompanyInfoSerializer, 
    TestimonialSerializer, 
    NewsArticleSerializer,
    NewsArticleListSerializer
)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


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


class CompanyInfoView(generics.RetrieveAPIView):
    """Get company information in a specific format for the frontend"""
    queryset = CompanyInfo.objects.filter(is_active=True)
    serializer_class = CompanyInfoSerializer
    
    def get_object(self):
        # Retourne le premier enregistrement actif ou crée un par défaut
        return CompanyInfo.objects.filter(is_active=True).first() or CompanyInfo.objects.create(
            name="Nell'Faa Groupe Majunga",
            description="Conglomérat leader à Madagascar, actif dans 7 secteurs d'activité pour répondre à tous vos besoins professionnels et personnels.",
            address="Majunga, Madagascar",
            phone="+261 XX XX XXX XX",
            email="contact@nellfaa-groupe.mg",
            working_hours="Lun-Ven: 8h00-17h00",
            weekend_hours="Sam: 8h00-12h00"
        )
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        
        # Formater les données pour le frontend
        data = {
            'name': instance.name,
            'description': instance.description,
            'address': instance.address,
            'phone': instance.phone,
            'email': instance.email,
            'business_hours': instance.business_hours,
            'social_media': {
                'facebook': instance.facebook_url or 'https://facebook.com',
                'linkedin': instance.linkedin_url or 'https://linkedin.com'
            }
        }
        
        return Response(data)


class TestimonialListView(generics.ListAPIView):
    """List all active testimonials"""
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['sector', 'rating']
    search_fields = ['client_name', 'client_company', 'content']
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']


class NewsArticleListView(generics.ListAPIView):
    """List all published news articles"""
    queryset = NewsArticle.objects.filter(is_active=True)
    serializer_class = NewsArticleListSerializer
    pagination_class = StandardResultsSetPagination
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
