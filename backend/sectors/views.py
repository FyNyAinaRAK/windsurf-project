from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Sector, Project, Service
from .serializers import SectorListSerializer, SectorDetailSerializer, ProjectSerializer, ServiceSerializer


class SectorListView(generics.ListAPIView):
    """List all active sectors"""
    queryset = Sector.objects.filter(is_active=True)
    serializer_class = SectorListSerializer
    ordering = ['order', 'name']


class SectorDetailView(generics.RetrieveAPIView):
    """Get single sector with all related data"""
    queryset = Sector.objects.filter(is_active=True)
    serializer_class = SectorDetailSerializer
    lookup_field = 'name'
    
    def get_object(self):
        try:
            return super().get_object()
        except Exception as e:
            from rest_framework.exceptions import NotFound
            raise NotFound(f"Secteur non trouvé ou inactif")


class ProjectListView(generics.ListAPIView):
    """List all active projects"""
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['sector__name', 'is_featured']
    search_fields = ['title', 'description', 'client']
    ordering_fields = ['completion_date', 'title']
    ordering = ['-completion_date']


class FeaturedProjectListView(generics.ListAPIView):
    """List featured projects only"""
    queryset = Project.objects.filter(is_active=True, is_featured=True)
    serializer_class = ProjectSerializer
    ordering = ['-completion_date']


class AdminServiceListView(generics.ListAPIView):
    """List administrative services only"""
    queryset = Service.objects.filter(is_active=True, is_administrative=True)
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['sector__name']
    search_fields = ['name', 'description']
    ordering_fields = ['order', 'name']
    ordering = ['sector', 'order', 'name']


class TechnicalServiceListView(generics.ListAPIView):
    """List technical (non-administrative) services only"""
    queryset = Service.objects.filter(is_active=True, is_administrative=False)
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['sector__name']
    search_fields = ['name', 'description']
    ordering_fields = ['order', 'name']
    ordering = ['sector', 'order', 'name']
