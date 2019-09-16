from django.urls import path, re_path, include
from django.views.generic import TemplateView
from . import views

app_name = 'myblock'

urlpatterns = [
    path('walking', TemplateView.as_view(template_name='myblock/walking.html')),
    re_path(r'^$', TemplateView.as_view(template_name='myblock/react.html'),
            name='myblock'),
]