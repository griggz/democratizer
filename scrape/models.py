from django.db import models
from django.urls import reverse
from django.db.models.signals import pre_save
from django.conf import settings
from .utils import unique_slug_generator as slugger
import pandas as pd
import datetime
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

time = datetime.datetime.now()


# class ScrapeManager(models.Manager):
#     def active(self, *args, **kwargs):
#         return super(ScrapeManager, self).filter(draft=False).filter(
#             scrape_date__lte=timezone.now())


class Yelp(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1,
                             on_delete=models.CASCADE)
    business_name = models.CharField(max_length=120, blank=True, null=True)
    link = models.CharField(max_length=120)
    page_amount = models.IntegerField(default=None, blank=True, null=True)
    scrape_date = models.DateTimeField(blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True)

    def get_business_name(self):
        link = self.link
        biz_url = link.rsplit('biz/', 1)
        if '?' in biz_url[1]:
            business = biz_url[1].split('?')[0]
        else:
            business = biz_url[1]

        self.business_name = business

    def clean_scrape_date(self):
        self.scrape_date = pd.to_datetime(time)

    def clean_page_amount(self):
        if self.page_amount is not None:
            if not isinstance(self.page_amount, int):
                raise ValidationError(
                    _('(value) is not even a number!'),
                    params={'value': self.page_amount},
                )
            if self.page_amount >= 100:
                raise ValidationError(
                    _('(value) is too high!'),
                    params={'value': self.page_amount},
                )

    def get_slug(self):
        self.slug = slugger(self)

    def save(self, **kwargs):
        self.clean()
        return super(Yelp, self).save(**kwargs)

    def clean(self):
        self.get_business_name()
        self.get_slug()
        self.clean_scrape_date()
        self.clean_page_amount()

    def get_absolute_url(self):
        return reverse('scrape-api:detail', kwargs={'slug': self.slug})


class Results(models.Model):
    business = models.ForeignKey(Yelp, related_name='reviews',
                                 on_delete=models.CASCADE, null=True)
    author = models.CharField(max_length=120, blank=True, null=True)
    date = models.CharField(max_length=120, blank=True)
    rating = models.CharField(max_length=120, blank=True, null=True)
    review = models.TextField(max_length=500, blank=True)

    def get_absolute_url(self):
        return reverse('scrape-api:detail', kwargs={'pk': self.pk})


class Analytics(models.Model):
    business = models.ForeignKey(Yelp, related_name='analytics',
                                 on_delete=models.CASCADE, null=True)
    word = models.CharField(max_length=120, blank=True, null=True)
    value = models.IntegerField(blank=True, null=True)

    def get_absolute_url(self):
        return reverse('scrape-api:detail', kwargs={'pk': self.pk})


def pre_save_scrape_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        pass


pre_save.connect(pre_save_scrape_receiver, sender=Yelp)
