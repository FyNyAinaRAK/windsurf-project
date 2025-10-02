from rest_framework import serializers
from .models import Sector, Service, Project, SectorStatistic


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'icon', 'is_administrative', 'order']


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
    administrative_services = serializers.SerializerMethodField()
    technical_services = serializers.SerializerMethodField()
    projects = ProjectSerializer(many=True, read_only=True)
    statistics = SectorStatisticSerializer(many=True, read_only=True)
    
    class Meta:
        model = Sector
        fields = [
            'id', 'name', 'display_name', 'description', 'short_description',
            'icon', 'image', 'meta_title', 'meta_description',
            'services', 'administrative_services', 'technical_services',
            'projects', 'statistics'
        ]
    
    def get_administrative_services(self, obj):
        """Return administrative services only"""
        try:
            admin_services = obj.services.filter(is_administrative=True, is_active=True).order_by('order', 'name')
            return ServiceSerializer(admin_services, many=True).data
        except Exception:
            return []
    
    def get_technical_services(self, obj):
        """Return technical/non-administrative services only"""
        try:
            tech_services = obj.services.filter(is_administrative=False, is_active=True).order_by('order', 'name')
            return ServiceSerializer(tech_services, many=True).data
        except Exception:
            return []
