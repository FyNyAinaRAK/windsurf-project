from rest_framework import serializers
from .models import ContactMessage, NewsletterSubscription


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            'nom', 'email', 'telephone', 'entreprise', 
            'secteur', 'sujet', 'message'
        ]
    
    def create(self, validated_data):
        # Create contact message with default status
        return ContactMessage.objects.create(**validated_data)


class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ['email', 'nom', 'secteurs_interesse']
    
    def create(self, validated_data):
        # Create or update newsletter subscription
        email = validated_data['email']
        subscription, created = NewsletterSubscription.objects.get_or_create(
            email=email,
            defaults=validated_data
        )
        if not created:
            # Update existing subscription
            for attr, value in validated_data.items():
                setattr(subscription, attr, value)
            subscription.save()
        return subscription
