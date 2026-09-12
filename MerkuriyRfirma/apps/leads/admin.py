from django.contrib import admin
from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'phone_number',
        'project_type',
        'status',
        'created_at',
    )
    list_editable = ('status',)
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'phone_number', 'project_type', 'notes')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    fieldsets = (
        ('Mijoz ma\'lumotlari', {
            'fields': ('name', 'phone_number', 'project_type', 'created_at')
        }),
        ('Ariza holati va eslatmalar', {
            'fields': ('status', 'notes')
        }),
    )
