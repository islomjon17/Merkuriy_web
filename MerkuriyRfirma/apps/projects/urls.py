from django.urls import path
from .views import CategoryListView, ProjectListView, ProjectDetailView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
]
