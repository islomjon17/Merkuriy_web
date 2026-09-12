import re
from rest_framework import serializers
from .models import Lead


class LeadCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id', 'name', 'phone_number', 'project_type', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        trimmed = value.strip()
        if len(trimmed) < 2:
            raise serializers.ValidationError("Ism kamida 2 ta belgidan iborat bo'lishi kerak.")
        return trimmed

    def validate_phone_number(self, value):
        trimmed = value.strip()
        # Clean standard phone characters
        cleaned = re.sub(r'[\s\-\(\)\+]', '', trimmed)
        if len(cleaned) < 7 or not cleaned.isdigit():
            raise serializers.ValidationError("To'g'ri telefon raqamini kiriting (masalan: +998901234567).")
        return trimmed


class LeadSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Lead
        fields = [
            'id',
            'name',
            'phone_number',
            'project_type',
            'status',
            'status_display',
            'notes',
            'created_at',
        ]
        read_only_fields = fields
