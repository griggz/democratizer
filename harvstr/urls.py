from django.urls import re_path, include, path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^account/', include('accounts.urls')),
    # Comms Links
    path('walking', TemplateView.as_view(template_name='comm/walking.html')),
    path('api/comms/', include('comm.urls')),
    # Scraper Links
    re_path(r'^scrape/', TemplateView.as_view(template_name='scrape/react.html'),
            name='scrape-list'),
    path('walking', TemplateView.as_view(template_name='scrape/walking.html')),
    path('api/scrape/', include('scrape.urls')),
    # Myblock Link
    re_path(r'^site-management/', include('myblock.urls'), name='myblock'),
    re_path(r'^site-management/comms/', TemplateView.as_view(template_name='comm/react.html'), name='comms-list'),
    # Homepage Link
    path('walking', TemplateView.as_view(template_name='landing/walking.html')),
    path('api/landing/', include('landing.urls')),
    re_path(r'^', TemplateView.as_view(template_name='landing/react.html'), name='landing'),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
