from rest_framework import serializers
from .models import Sector, Service, Project, SectorStatistic


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'icon', 'order']


class SectorStatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectorStatistic
        fields = ['id', 'label', 'value', 'unit', 'order']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'client', 'location',
            'completion_date', 'image', 'budget_range', 'duration'
        ]


class SectorListSerializer(serializers.ModelSerializer):
    """Simplified serializer for sector list view"""
    class Meta:
        model = Sector
        fields = [
            'id', 'name', 'display_name', 'short_description', 
            'icon', 'image', 'order'
        ]


class SectorDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for single sector view"""
    services = ServiceSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    statistics = SectorStatisticSerializer(many=True, read_only=True)
    
    class Meta:
        model = Sector
        fields = [
            'id', 'name', 'display_name', 'description', 'short_description',
            'icon', 'image', 'meta_title', 'meta_description',
            'services', 'projects', 'statistics'
        ]
