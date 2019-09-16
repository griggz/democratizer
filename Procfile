release: python manage.py migrate
web: gunicorn harvstr.wsgi:application
worker: celery -A harvstr worker
beat: celery -A harvstr beat -S django