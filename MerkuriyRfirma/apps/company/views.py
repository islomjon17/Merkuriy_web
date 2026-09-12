from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status

from .models import SiteConfiguration, ContactInfo, Testimonial
from .serializers import (
    SiteConfigurationSerializer,
    StatsSerializer,
    PromoBannerSerializer,
    TestimonialSerializer,
    ContactInfoSerializer,
)
from apps.projects.models import Project
from apps.projects.serializers import HeroSlideSerializer, ProjectListSerializer


class HomeView(APIView):
    """
    GET /api/home/
    Consolidated public endpoint returning:
    - site_configuration / site_config: company brand & about summary
    - stats: years of experience, completed projects, worker counts
    - promo_banner / promo: active promotion or seasonal discount info
    - testimonials: client feedback and reviews
    - hero_slides: active slider banners and highlighted projects
    - featured_projects: featured project cards
    """
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        config_obj = SiteConfiguration.get_solo()
        testimonials = Testimonial.objects.filter(is_active=True)[:10]
        hero_slides = Project.objects.filter(show_in_hero=True).select_related('category')[:6]
        featured_projects = Project.objects.filter(is_featured=True).select_related('category')[:6]

        site_config_data = SiteConfigurationSerializer(config_obj, context={'request': request}).data
        stats_data = StatsSerializer(config_obj).data
        promo_data = PromoBannerSerializer(config_obj).data
        testimonials_data = TestimonialSerializer(testimonials, many=True, context={'request': request}).data
        hero_slides_data = HeroSlideSerializer(hero_slides, many=True, context={'request': request}).data
        featured_projects_data = ProjectListSerializer(featured_projects, many=True, context={'request': request}).data

        response_data = {
            'site_configuration': site_config_data,
            'site_config': site_config_data,
            'stats': stats_data,
            'promo_banner': promo_data,
            'promo': promo_data,
            'testimonials': testimonials_data,
            'hero_slides': hero_slides_data,
            'featured_projects': featured_projects_data,
        }
        return Response(response_data, status=status.HTTP_200_OK)


class ContactView(APIView):
    """
    GET /api/contact/
    Returns company contact information, working hours, and social media channels.
    """
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        contact_obj = ContactInfo.get_solo()
        serializer = ContactInfoSerializer(contact_obj, context={'request': request})
        raw_data = serializer.data

        response_data = {
            'company_name': "Merkuriy-R Xususiy qurilish firmasi",
            'primary_phone': raw_data.get('primary_phone', ''),
            'secondary_phone': raw_data.get('secondary_phone', ''),
            'email': raw_data.get('email', ''),
            'address': raw_data.get('address', ''),
            'working_hours': raw_data.get('working_hours', ''),
            'telegram_url': raw_data.get('socials', {}).get('telegram_url', ''),
            'instagram_url': raw_data.get('socials', {}).get('instagram_url', ''),
            'facebook_url': raw_data.get('socials', {}).get('facebook_url', ''),
            'youtube_url': raw_data.get('socials', {}).get('youtube_url', ''),
            'socials': raw_data.get('socials', {}),
        }
        return Response(response_data, status=status.HTTP_200_OK)
