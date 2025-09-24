from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Sector, Project
from .serializers import SectorListSerializer, SectorDetailSerializer, ProjectSerializer


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
