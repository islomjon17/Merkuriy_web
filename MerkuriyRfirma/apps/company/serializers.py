from rest_framework import serializers
from .models import SiteConfiguration, ContactInfo, Testimonial


class SiteConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfiguration
        fields = [
            'company_name',
            'about_title',
            'about_description',
        ]


class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfiguration
        fields = [
            'years_experience',
            'completed_projects',
            'master_workers',
        ]


class PromoBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfiguration
        fields = [
            'promo_active',
            'promo_title',
            'promo_description',
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id',
            'client_name',
            'client_title',
            'quote',
            'avatar',
            'rating',
            'created_at',
        ]


class ContactInfoSerializer(serializers.ModelSerializer):
    socials = serializers.SerializerMethodField()

    class Meta:
        model = ContactInfo
        fields = [
            'primary_phone',
            'secondary_phone',
            'email',
            'address',
            'working_hours',
            'socials',
        ]

    def get_socials(self, obj):
        return {
            'telegram_url': obj.telegram_url,
            'instagram_url': obj.instagram_url,
            'facebook_url': obj.facebook_url,
            'youtube_url': obj.youtube_url,
        }
