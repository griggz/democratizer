from django import forms
from django.forms import ModelForm, HiddenInput
from .models import Feedback, About
from django.forms import TextInput, Textarea
from django.core.validators import ValidationError


class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
        widgets = {'comments': Textarea(attrs={'placeholder': 'Hi!'})}
        labels = {'comments': 'Message', 'name': 'Name', 'email': 'Email', 'phone_number': 'Phone Number'}
        fields = [
            'name',
            'email',
            'phone_number',
            "comments"
        ]


class AboutMeForm(ModelForm):
    class Meta:
        model = About
        widgets = {'unsplash_url': HiddenInput()}
        fields = [
            "user",
            "title",
            "post_image",
            "unsplash_url",
            'width_field',
            'height_field',
            "content"
        ]

    def clean_unsplash_url(self):
        post_image = self.cleaned_data.get("post_image")
        image_height = self.cleaned_data.get("height_field")
        image_width = self.cleaned_data.get('width_field')

        if not post_image:
            raise ValidationError('Error')
        else:
            unsplash_api = str("https://source.unsplash.com")
            unsplash_image_id = str(post_image)
            image_size = str(image_width), str(image_height)
            join_size = 'x'.join(image_size)
            join_fields = unsplash_api, unsplash_image_id, join_size
            compile_url = '/'.join(join_fields)

        return compile_url
