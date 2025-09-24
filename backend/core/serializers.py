from rest_framework import serializers
from .models import CompanyInfo, Testimonial, NewsArticle


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = [
            'id', 'name', 'description', 'address', 'phone', 'email', 
            'website', 'facebook_url', 'linkedin_url', 'business_hours'
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_company', 'content', 
            'rating', 'sector', 'created_at'
        ]


class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 
            'image', 'published_date', 'is_featured'
        ]


class NewsArticleListSerializer(serializers.ModelSerializer):
    """Simplified serializer for news list view"""
    class Meta:
        model = NewsArticle
        fields = [
            'id', 'title', 'slug', 'excerpt', 
            'image', 'published_date', 'is_featured'
        ]
