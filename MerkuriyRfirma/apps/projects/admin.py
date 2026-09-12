from django.contrib import admin
from .models import Category, Project, ProjectGallery


class ProjectGalleryInline(admin.TabularInline):
    model = ProjectGallery
    extra = 2
    fields = ('image', 'caption')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'projects_count')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}

    def projects_count(self, obj):
        return obj.projects.count()
    projects_count.short_description = "Loyihalar soni"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'category',
        'volume',
        'budget',
        'status',
        'is_featured',
        'show_in_hero',
        'created_at',
    )
    list_editable = ('show_in_hero', 'is_featured', 'status')
    list_filter = ('status', 'is_featured', 'show_in_hero', 'category', 'created_at')
    search_fields = ('title', 'short_description', 'full_description', 'location')
    inlines = [ProjectGalleryInline]

    fieldsets = (
        ('Asosiy ma\'lumotlar', {
            'fields': (
                'title',
                'category',
                'budget',
                'short_description',
                'full_description',
                'volume',
                'location',
                'status',
                'is_featured',
            )
        }),
        ('Hero Slayder (Bosh sahifa)', {
            'fields': (
                'show_in_hero',
                'hero_image',
            ),
            'description': "Bosh sahifa yuqorisidagi slayderda ko'rsatiladigan rasmlar (1920x1080 tavsiya etiladi)."
        }),
        ('Media va Taqqoslash rasmlari', {
            'fields': (
                'main_thumbnail',
                'before_image',
                'after_image',
                'satellite_image',
                'satellite_link',
            )
        }),
    )
