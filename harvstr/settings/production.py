import os
import dj_database_url
# import environ

# env = environ.Env(
#     # set casting, default value
#     DEBUG=(bool, False)
# )
# # reading .env file
# environ.Env.read_env()

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'check host location'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['www.harvstr.io', 'harvstr.io', 'harvstr.herokuapp.com', 'harvstr-staging.herokuapp.com']

# EMAIL_HOST = 'mail.name.com'
# EMAIL_HOST_USER = 'wayne@vvayne.io'
# DEFAULT_FROM_EMAIL = 'wayne@vvayne.io'
# EMAIL_HOST_PASSWORD = 'LBbjH8Z7!7!'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True

# Application definition

INSTALLED_APPS = [
    # Django Apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third Party Apps
    'crispy_forms',
    'django.contrib.humanize',
    'django_hosts',
    'rest_framework',
    'pagedown',
    'django_celery_beat',
    'django_celery_results',
    # My Apps
    'accounts',
    'scrape',
    'comm',
    'landing',
    'myblock'

]

MIDDLEWARE = [
    'django_hosts.middleware.HostsRequestMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'harvstr.middleware.LoginRequiredMiddleware',
    'django_hosts.middleware.HostsResponseMiddleware',
]

LOGIN_URL = '/account/login'

LOGIN_EXEMPT_URLS = [
    '/account/logout',
    '/account/register',
    '/account/reset-password/',
    '/account/reset-password/done/',
    '/account/reset-password/confirm/',
    '/account/reset-password/complete/',
    '/'
]

ROOT_URLCONF = 'harvstr.urls'
ROOT_HOSTCONF = 'harvstr.hosts'
DEFAULT_HOST = 'www'
DEFAULT_REDIRECT_URL = 'http://www.harvstr.io'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

WSGI_APPLICATION = 'harvstr.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Update database configuration with $DATABASE_URL.
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_L10N = True

USE_TZ = True

CRISPY_TEMPLATE_PACK = 'bootstrap4'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)

STATIC_ROOT = os.path.join(BASE_DIR, "live-static", "static-root")

MEDIA_URL = "/media/"

MEDIA_ROOT = os.path.join(BASE_DIR, "live-static", "media-root")

# CELERY REQUIREMENTS

# CELERY_BROKER_URL = os.environ['REDIS_URL']
CELERY_RESULT_BACKEND = 'django-db'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE

# REACT VARIABLES
BUILD_JSON = 'utils/build.json'

# SCRAPE
IGNORE_WORDS_JSON = 'src/scrape/scripts/text_analysis/constants/words_ignore.json'
