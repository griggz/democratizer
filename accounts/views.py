from django.contrib.auth import (authenticate, get_user_model, login, logout)
from django.contrib import messages
from django.shortcuts import render, redirect
from .forms import UserLoginForm, UserRegisterForm
from django.core.mail import send_mail
from django.conf import settings


def login_view(request):
    next = request.GET.get('next')
    title = "Login"
    form = UserLoginForm(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data.get("username").lower()
        password = form.cleaned_data.get("password")
        user = authenticate(username=username, password=password)
        login(request, user)
        if next:
            return redirect(next)
        return redirect("/")

    return render(request, "accounts/login_form.html", {"form": form, "title": title})


def register_view(request):
    next = request.GET.get('next')
    title = "Register"
    form = UserRegisterForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=False)
        password = form.cleaned_data.get("password")
        # username = form.cleaned_data.get("username")
        user_email = form.cleaned_data.get("email")
        user.set_password(password)
        # user.is_active = False
        user.save()

        # Email User
        subject = 'vvayne.io Registration'
        from_email = settings.EMAIL_HOST_USER
        to_email = user_email
        message = 'Thank You For Registering!'
        send_mail(
            subject,
            message,
            from_email,
            [to_email],
            fail_silently=False,
            html_message='<p>Thank you for registering with <a href="https://www.vvayne.io">vvayne.io</a>! If you have any questions, wish to know more about my background, or find a bug, <br />'
                         'contact me anytime at wayne@vvayne.io. <br/>'
                         '<br/ >'
                         'Regards,<br />' 
                         '<br />'   
                         'Wayne Grigsby <br />'
                         'wayne@vvayne.io <br />'
                         '<a href="https://www.vvayne.io">vvayne.io</a></p>'
        )
        send_mail(
            'New Registration',
            'New user created!',
            from_email,
            ['wayne@vvayne.io'],
            fail_silently=False,
        )
        messages.success(request, "Thank you for registering!")
        new_user = authenticate(username=user.username, password=password)
        login(request, new_user)
        if next:
            return redirect(next)
        return redirect('/')

    context = {
        "form": form,
        "title": title
    }
    return render(request, "accounts/register_form.html", context)


def logout_view(request):
    logout(request)
    return redirect("/")
