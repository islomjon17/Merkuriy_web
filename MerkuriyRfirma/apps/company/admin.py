from django.contrib import admin
from apps.core.admin import SingletonAdmin
from .models import SiteConfiguration, ContactInfo, Testimonial


@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(SingletonAdmin):
    fieldsets = (
        ('Kompaniya brendi va haqida', {
            'fields': ('company_name', 'about_title', 'about_description')
        }),
        ('Statistika va yutuqlar', {
            'fields': ('years_experience', 'completed_projects', 'master_workers')
        }),
        ('Aksiya / Chegirma banneri', {
            'fields': ('promo_active', 'promo_title', 'promo_description')
        }),
    )


@admin.register(ContactInfo)
class ContactInfoAdmin(SingletonAdmin):
    fieldsets = (
        ('Aloqa vositalari', {
            'fields': ('primary_phone', 'secondary_phone', 'email', 'address', 'working_hours')
        }),
        ('Ijtimoiy tarmoqlar', {
            'fields': ('telegram_url', 'instagram_url', 'facebook_url', 'youtube_url')
        }),
    )


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_title', 'rating', 'is_active', 'created_at')
    list_editable = ('is_active',)
    list_filter = ('is_active', 'rating', 'created_at')
    search_fields = ('client_name', 'client_title', 'quote')
