from django.urls import re_path, path
from . import views

app_name = 'comms-api'

urlpatterns = [
    path('', views.CommsListCreateAPIView.as_view(), name='list-create'),
    re_path(r'^(?P<slug>[\w-]+)/$', views.CommsDetailAPIView.as_view(),
            name='detail'),
]



