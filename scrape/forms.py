from .models import Yelp
from django.forms import ModelForm, HiddenInput
from django.core.validators import ValidationError


class YelpForm(ModelForm):

    class Meta:
        model = Yelp
        widgets = {'business_name': HiddenInput(), 'slug': HiddenInput()}
        fields = ['link', 'page_amount', 'business_name', 'slug']
        labels = {'link': 'Yelp Link', 'scrape_date': 'Date Scraped',
                  'slug': 'Slug'}

    def __init__(self, *args, **kwargs):
        self.results = None
        super(YelpForm, self).__init__(*args, **kwargs)

    def clean_link(self):
        link = self.cleaned_data.get('link')
        link = str(link)
        valid_link = ['https', 'http', 'www.']
        if not link:
            raise ValidationError('Enter a valid yelp link!')
        elif not link.startswith(tuple(valid_link)):
            raise ValidationError('Enter a valid yelp link!')
        elif 'www.yelp.com' not in link:
            raise ValidationError('Enter a valid yelp link!')
        else:
            return link


