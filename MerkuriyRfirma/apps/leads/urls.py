from django.urls import path
from .views import LeadCreateView

urlpatterns = [
    path('leads/create/', LeadCreateView.as_view(), name='lead-create'),
]
