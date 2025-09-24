from rest_framework import generics, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage, NewsletterSubscription
from .serializers import ContactMessageSerializer, NewsletterSubscriptionSerializer


class ContactMessageCreateView(generics.CreateAPIView):
    """Create a new contact message"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact_message = serializer.save()
        
        # Send email notification to admin
        try:
            subject = f"Nouveau message de contact - {contact_message.sujet or 'Sans sujet'}"
            message = f"""
            Nouveau message de contact reçu:
            
            Nom: {contact_message.nom}
            Email: {contact_message.email}
            Téléphone: {contact_message.telephone}
            Entreprise: {contact_message.entreprise}
            Secteur: {contact_message.get_secteur_display()}
            Sujet: {contact_message.sujet}
            
            Message:
            {contact_message.message}
            
            Date: {contact_message.created_at.strftime('%d/%m/%Y à %H:%M')}
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.DEFAULT_FROM_EMAIL],
                fail_silently=True,
            )
        except Exception as e:
            # Log error but don't fail the request
            print(f"Erreur envoi email: {e}")
        
        return Response(
            {
                'message': 'Votre message a été envoyé avec succès. Nous vous recontacterons rapidement.',
                'id': contact_message.id
            },
            status=status.HTTP_201_CREATED
        )


class NewsletterSubscriptionCreateView(generics.CreateAPIView):
    """Subscribe to newsletter"""
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        subscription = serializer.save()
        
        return Response(
            {
                'message': 'Inscription à la newsletter réussie !',
                'email': subscription.email
            },
            status=status.HTTP_201_CREATED
        )
