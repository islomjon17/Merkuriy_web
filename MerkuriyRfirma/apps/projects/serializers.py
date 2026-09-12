from rest_framework import serializers
from .models import Category, Project, ProjectGallery


class CategorySerializer(serializers.ModelSerializer):
    projects_count = serializers.IntegerField(source='projects.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'projects_count']


class ProjectGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectGallery
        fields = ['id', 'image', 'caption']


class ProjectListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    budget_formatted = serializers.CharField(read_only=True)

    class Meta:
        model = Project
        fields = [
            'id',
            'category',
            'title',
            'short_description',
            'volume',
            'location',
            'budget',
            'budget_formatted',
            'status',
            'status_display',
            'is_featured',
            'show_in_hero',
            'hero_image',
            'main_thumbnail',
            'created_at',
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    budget_formatted = serializers.CharField(read_only=True)
    gallery = ProjectGallerySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id',
            'category',
            'title',
            'short_description',
            'full_description',
            'volume',
            'location',
            'budget',
            'budget_formatted',
            'status',
            'status_display',
            'is_featured',
            'show_in_hero',
            'hero_image',
            'main_thumbnail',
            'before_image',
            'after_image',
            'satellite_image',
            'satellite_link',
            'gallery',
            'created_at',
            'updated_at',
        ]


class HeroSlideSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', default=None, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    budget_formatted = serializers.CharField(read_only=True)

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'category_name',
            'short_description',
            'hero_image',
            'volume',
            'location',
            'budget',
            'budget_formatted',
            'status',
            'status_display',
        ]
