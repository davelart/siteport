from pathlib import Path
import environ
import os
from django.urls import reverse_lazy

# Build paths inside the project like this: BASE_DIR / 'subdir'.
env = environ.Env()
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG')
TEMPLATE_DEBUG = env.bool('TEMPLATE_DEBUG')
DEBUG404 = env.bool('DEBUG404')

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')
ALLOW_ALL_ORIGINS = env.bool('ALLOW_ALL_ORIGINS')
ALLOWED_ORIGINS = env.list('ALLOWED_ORIGINS')

# Suppress development server warning in development mode
# if DEBUG:
#     import warnings
#     warnings.filterwarnings("ignore", category=RuntimeWarning, module="django")

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

AUTHENTICATION_BACKENDS = [
    'accounts.backends.EmailBackend',
    'django.contrib.auth.backends.ModelBackend',
]

CUSTOM_APPS = [
    'accounts',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'django_filters',
    'corsheaders',
    'rest_framework_simplejwt',
    'drf_spectacular',
    'drf_spectacular_sidecar',
    'tinymce',
]

INSTALLED_APPS += CUSTOM_APPS + THIRD_PARTY_APPS

REST_FRAMEWORK = {
    'FORMAT_SUFFIX_KWARGS': False,
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# JWT Settings
SIMPLE_JWT = {
    'USER_ID_FIELD': 'id',  # Use 'identifier' instead of 'id' as the user identifier
    'USER_ID_CLAIM': 'user_id',     # The claim in the token payload
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 50,

    # RATE LIMITING
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day',
        'burst': '100/hour',
        'articles': '50/hour',
    },
}

TINYMCE_DEFAULT_CONFIG = {
    'plugins': 'code',
    'toolbar_append': 'code',
}

# SPECTACULAR SETTINGS
SPECTACULAR_SETTINGS = {
    'TITLE': 'Logitrac API',
    'DESCRIPTION': 'API for Logitrac transport app',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': True,
    'SERVE_AUTHENTICATION': None,
    'EXCLUDE_PATH': [reverse_lazy("schema")],
    'TAGS': [
        {'name': 'Accounts', 'description': 'User account management'},
    ],
    'EXTENTIONS_ROOT': {
        'x-tagGroups': [
            {
                'name': 'Accounts',
                'tags': [
                    'User', 'SignIn', 'SignUp'
                ]
            }
        ]
    },
    'REDOC_UI_SETTINGS' : {
        'deepLinking': True,
        'hideDownloadButton': True,
        'hideSchemaTitles': True,
        'theme': {
            'layout': {
                'topbar': {
                    'sticky': True,
                },
            },
            'logo': {
                'gutter': '50px',
                'maxWidth': '300px',
            },
            'colors': {
                'bg': '#ffffff',
                'http': {
                    'get': '#00cc99',
                    'post': '#00cc99',
                    'put': '#00cc99',
                    'delete': '#00cc99',
                },
            },
            'typography': {
                'fontFamily': 'Inter, sans-serif',
                'lineHeight': '1.5',
                'code': {
                    'fontFamily': 'Inter, sans-serif',
                    'lineHeight': '1.5',
                },
                'headings': {
                    'fontFamily': 'Inter, sans-serif',
                    'lineHeight': '1.5',
                },
            },
            'spacing': {
                'unit': 8,
                'sectionVertical': 50,
            },
            'sidecar': {
                'backgroundColor': '#333333',
                'textColor': '#ffffff',
                'activeTextColor': 'teal',
                'width': '300px',
            },
            'rightPanel': {
                'width': '40%',
            },
            'codeBlock': {
                'theme': 'dracula',
            },
        },
        'headScripts': [
            {
                'content': '''
                var link = document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'icon';
                # link.href = '/static/images/favicon.ico';
                document.getElementsByTagName('head')[0].appendChild(link);
                '''
            }
        ]
    },
    'SWAGGER_UI_DIST': 'SIDECAR',
    'SWAGGER_UI_FAVICON_HREF': 'SIDECAR',
    'REDOC_DIST': 'SIDECAR',
}

REDOC_USE_JWT =  True

ROOT_URLCONF = 'logitrac.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'logitrac.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# Use environment variables for database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME', default='logitrac'),
        'USER': env('DB_USER', default='postgres'),
        'PASSWORD': env('DB_PASSWORD', default='postgres'),
        'HOST': env('DB_HOST', default='localhost'),
        'PORT': env('DB_PORT', default='5432'),
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_URL = 'media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATICFILES_ROOT = [os.path.join(BASE_DIR, 'static'), ]

################ CORS HEADERS ################
CORS_ALLOW_ALL_ORIGINS = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Google Maps API key (if needed for frontend)
# GOOGLE_MAPS_API_KEY = env('GOOGLE_MAPS_API_KEY', '')
