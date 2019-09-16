from django.urls import path, re_path, include
from django.contrib.auth.views import (PasswordResetView, PasswordResetDoneView,
                                       PasswordResetConfirmView, PasswordResetCompleteView)
from accounts.views import (login_view, register_view, logout_view)

app_name = 'accounts'

urlpatterns = [
    re_path(r'^login/$', login_view, name='login'),
    re_path(r'^logout/$', logout_view, name='logout'),
    re_path(r'^register/$', register_view, name='register'),
    re_path(r'^reset-password/$', PasswordResetView.as_view(), {'template_name': 'accounts/reset_password.html', 'post_reset_redirect': 'accounts:password_reset_done', 'email_template_name': 'accounts/reset_password_email.html'}, name='reset_password'),
    re_path(r'^reset-password/done/$', PasswordResetDoneView.as_view(), {'template_name': 'accounts/reset_password_done.html'}, name='password_reset_done'),
    re_path(r'^reset-password/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', PasswordResetConfirmView.as_view(), {'template_name': 'accounts/reset_password_confirm.html', 'post_reset_redirect': 'accounts:password_reset_complete'}, name='password_reset_confirm'),
    re_path(r'^reset-password/complete/$', PasswordResetCompleteView.as_view(), {'template_name': 'accounts/reset_password_complete.html'}, name='password_reset_complete'),

]
