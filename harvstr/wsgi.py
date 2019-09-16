import os
from django.conf import settings
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "harvstr.settings")

application = get_wsgi_application()
# application = DjangoWhiteNoise(application)

if not settings.DEBUG:
    try:
        application = get_wsgi_application()
    except:
        pass
