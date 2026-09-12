from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Category, Project
from .serializers import (
    CategorySerializer,
    ProjectListSerializer,
    ProjectDetailSerializer,
)


class CategoryListView(generics.ListAPIView):
    """
    GET /api/categories/
    Returns all categories with their associated project count.
    """
    queryset = Category.objects.all().prefetch_related('projects')
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class ProjectListView(generics.ListAPIView):
    """
    GET /api/projects/?category={slug}&status={status}&featured={true/false}
    Returns a list of projects with optional category and status filtering.
    """
    serializer_class = ProjectListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Project.objects.select_related('category').all()

        # Filter by category slug
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        # Filter by project status ('in_progress', 'completed')
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)

        # Filter by featured
        featured = self.request.query_params.get('featured')
        if featured is not None:
            if featured.lower() in ['true', '1']:
                queryset = queryset.filter(is_featured=True)
            elif featured.lower() in ['false', '0']:
                queryset = queryset.filter(is_featured=False)

        return queryset


class ProjectDetailView(generics.RetrieveAPIView):
    """
    GET /api/projects/{id}/
    Returns complete project details including media gallery and comparison images.
    """
    queryset = Project.objects.select_related('category').prefetch_related('gallery').all()
    serializer_class = ProjectDetailSerializer
    permission_classes = [AllowAny]
