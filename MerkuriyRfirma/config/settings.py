"""
Django settings for MerkuriyRfirma project.
"Merkuriy-R Xususiy qurilish firmasi" Backend API.
"""

from pathlib import Path
from decouple import config, Csv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Security settings
SECRET_KEY = config('SECRET_KEY', default='django-insecure-change-in-production')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*', cast=Csv())

# Application definition
INSTALLED_APPS = [
    # Django Core Apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-Party Apps
    'rest_framework',
    'corsheaders',

    # Local Domain Apps
    'apps.core.apps.CoreConfig',
    'apps.company.apps.CompanyConfig',
    'apps.projects.apps.ProjectsConfig',
    'apps.leads.apps.LeadsConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # High priority CORS middleware
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# Using SQLite3 for zero-overhead, lean deployment
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
        'OPTIONS': {
            'timeout': 20,  # 20 seconds busy timeout for concurrent threads
        },
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization & Timezone
LANGUAGE_CODE = 'uz'
TIME_ZONE = 'Asia/Tashkent'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = []

# Media files (Project banners, testimonials avatars, gallery)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Public read & lead submission
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DATETIME_FORMAT': '%Y-%m-%d %H:%M:%S',
}

# CORS configuration for Netlify integration
CORS_ALLOW_ALL_ORIGINS = config('CORS_ALLOW_ALL_ORIGINS', default=False, cast=bool)
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='https://*.netlify.app,http://localhost:3000,http://127.0.0.1:3000',
    cast=Csv()
)
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https:\/\/.*\.netlify\.app$",
]
CORS_ALLOW_CREDENTIALS = True

# Email SMTP Settings for Lead Notifications
EMAIL_BACKEND = config('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='Merkuriy-R Xususiy qurilish firmasi <noreply@merkuriy-r.uz>')
NOTIFY_EMAIL_RECIPIENTS = config(
    'NOTIFY_EMAIL_RECIPIENTS',
    default='info@merkuriy-r.uz',
    cast=Csv()
)

# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_FILE = config('GOOGLE_SERVICE_ACCOUNT_FILE', default='google_service_account.json')
GOOGLE_SHEET_KEY = config('GOOGLE_SHEET_KEY', default='')

# Company Branding Meta
COMPANY_OFFICIAL_NAME = "Merkuriy-R Xususiy qurilish firmasi"
ADMIN_SITE_HEADER = "Merkuriy-R Xususiy qurilish firmasi Boshqaruvi"
ADMIN_SITE_TITLE = "Merkuriy-R Admin"
ADMIN_INDEX_TITLE = "Boshqaruv Paneli"
