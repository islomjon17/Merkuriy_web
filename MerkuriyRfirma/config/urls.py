"""
URL configuration for MerkuriyRfirma project.
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

# Customize Django Admin Branding
admin.site.site_header = getattr(settings, 'ADMIN_SITE_HEADER', "Merkuriy-R Xususiy qurilish firmasi Boshqaruvi")
admin.site.site_title = getattr(settings, 'ADMIN_SITE_TITLE', "Merkuriy-R Admin")
admin.site.index_title = getattr(settings, 'ADMIN_INDEX_TITLE', "Boshqaruv Paneli")

urlpatterns = [
    # Django Admin
    path('admin/', admin.site.urls),

    # REST API Endpoints
    path('api/', include('apps.company.urls')),
    path('api/', include('apps.projects.urls')),
    path('api/', include('apps.leads.urls')),
]

# Ensure media routes are served properly in standalone/production mode
urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
