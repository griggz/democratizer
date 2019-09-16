from .models import Comms
from django.forms import ModelForm, HiddenInput


class CommsForm(ModelForm):
    class Meta:
        model = Comms
        # widgets = {'unsplash_url': HiddenInput()}
        fields = ['site_location', 'author', 'title', 'content']
        # labels = {'author': 'Author', 'title': 'Title', 'slug': 'Slug', 'content': 'Content', 'post_image': 'Post Image', 'height_field': 'Image Height', 'width_field': 'Image Width', 'draft': "Draft", 'publish': 'Publish Date'}
        # help_texts = {'post_image': 'Get your photo ID from <a href="https://unsplash.com" target="_blank">Unsplash.com</a>. Use this <a href="http://quick.as/x3vycpgog" target="_blank">guide</a> if you need help. Or, if you want a random image, copy/paste this url "https://source.unsplash.com/random" to pull random images from unsplash.',
        #               'draft': 'Is this post a draft? (Any post marked as "draft" will not be displayed to unauthorized users)', 'publish': 'When would you like this post published? (Any post marked with a date in the future will not be displayed to public users until the future date arrives.)'
        #               }
