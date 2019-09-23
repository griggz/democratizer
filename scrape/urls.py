from django.urls import re_path, path
from . import views

app_name = 'scrape-api'

urlpatterns = [
    path('yelp', views.ScrapeListCreateAPIView.as_view(), name='yelp-list-create'),
    re_path(r'^yelp/(?P<slug>[\w-]+)/$', views.ScrapeDetailAPIView.as_view(),
            name='yelp_detail'),
    path('indeed', views.ScrapeListCreateAPIView.as_view(), name='indeed-list-create'),
    re_path(r'^indeed/(?P<slug>[\w-]+)/$', views.ScrapeDetailAPIView.as_view(),
            name='indeed_detail'),
]
