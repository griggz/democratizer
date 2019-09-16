from django import forms
from django.contrib.auth import (authenticate, get_user_model)
from django.forms import TextInput

User = get_user_model()


class UserLoginForm(forms.Form):
    # class Meta:
    #     model = get_user_model()
    #     widgets = {'username': TextInput(attrs={'placeholder': 'Username'}), 'password': TextInput(attrs={'placeholder': 'Password'}), }
    username = forms.CharField(widget=TextInput(attrs={'placeholder': 'Username'}), label='')
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password'}), label='',)

    def clean(self, *args, **kwargs):
        username = self.cleaned_data.get("username").lower()
        password = self.cleaned_data.get("password")
        user_qs = User.objects.filter(username=username)
        if user_qs.count() == 0:
            raise forms.ValidationError("This user does not exist")

        else:
            user_status = User.objects.get(username=username)
            if user_status.is_active == False:
                raise forms.ValidationError("This user is either pending approval or no longer active.")

            user = authenticate(username=username, password=password)
            if not user:
                raise forms.ValidationError("Incorrect Password")

        return super(UserLoginForm, self).clean(*args, **kwargs)


class UserRegisterForm(forms.ModelForm):
    username = forms.CharField(widget=TextInput(attrs={'placeholder': 'Username'}), label='', help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.')
    first_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'First Name'}), label='')
    last_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Last Name'}), label='')
    email = forms.EmailField(widget=forms.TextInput(attrs={'placeholder': 'Email'}), label='')
    email2 = forms.EmailField(widget=forms.TextInput(attrs={'placeholder': 'Confirm Email'}), label='')
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password'}), label='')

    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'email2',
            'password'
        ]

    def clean_email2(self):
        email = self.cleaned_data.get('email')
        email2 = self.cleaned_data.get('email2')
        if email != email2:
            raise forms.ValidationError("Emails must match")
        email_qs = User.objects.filter(email=email)
        if email_qs.exists():
            raise forms.ValidationError("This email has already been registered")
        return email

    def clean_username(self):
        username = self.cleaned_data.get('username')
        return username.lower()
