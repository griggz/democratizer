from django.urls import path, re_path, include
from django.views.generic import TemplateView
from . import views
# from django.contrib import admin
# from django.contrib.auth import views as auth_views

app_name = 'landing-api'

urlpatterns = [
    path('', views.FeedbackListCreateAPIView.as_view(), name='list-create'),
    re_path(r'^(?P<id>[\d]+)/$', views.FeedbackDetailAPIView.as_view(),
            name='detail')
]
