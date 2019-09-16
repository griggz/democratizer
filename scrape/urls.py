from django.urls import re_path, path
from . import views

app_name = 'scrape-api'

urlpatterns = [
    path('', views.ScrapeListCreateAPIView.as_view(), name='list-create'),
    re_path(r'^(?P<slug>[\w-]+)/$', views.ScrapeDetailAPIView.as_view(),
            name='detail')
]
