from django.db import models
from django.urls import reverse
from django.db.models.signals import pre_save
from django.conf import settings
from .utils import unique_slug_generator as slugger
import pandas as pd
import datetime
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from .utils import getBusinessName
from scrape.utils import websiteIdentifier

time = datetime.datetime.now()


# class ScrapeManager(models.Manager):
#     def active(self, *args, **kwargs):
#         return super(ScrapeManager, self).filter(draft=False).filter(
#             scrape_date__lte=timezone.now())


class Collect(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1,
                             on_delete=models.CASCADE)
    site = models.CharField(max_length=120, blank=True, null=True)
    business_name = models.CharField(max_length=120, blank=True, null=True)
    link = models.CharField(max_length=120)
    page_amount = models.IntegerField(default=None, blank=True, null=True)
    scrape_date = models.DateTimeField(blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True)

    def get_business_name(self):
        self.business_name = getBusinessName(self.link)

    def clean_scrape_date(self):
        self.scrape_date = pd.to_datetime(time)

    def clean_site(self):
        self.site = websiteIdentifier(self)[0]

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
        return super(Collect, self).save(**kwargs)

    def clean(self):
        self.get_business_name()
        self.get_slug()
        self.clean_site()
        self.clean_scrape_date()
        self.clean_page_amount()

    def get_absolute_url(self):
        return reverse('scrape-api:detail', kwargs={'slug': self.slug})


class Results(models.Model):
    collection_id = models.ForeignKey(Collect, related_name='reviews',
                                      on_delete=models.CASCADE, null=True)
    author = models.CharField(max_length=120, blank=True, null=True)
    date = models.CharField(max_length=120, blank=True)
    rating = models.CharField(max_length=120, blank=True, null=True)
    review = models.TextField(max_length=500, blank=True)

    def get_absolute_url(self):
        return reverse('scrape-api:detail', kwargs={'pk': self.pk})


class IndeedResults(models.Model):
    collection_id = models.ForeignKey(Collect, related_name='indeed_reviews',
                                      on_delete=models.CASCADE, null=True)
    date = models.CharField(max_length=120, blank=True)
    rating = models.CharField(max_length=120, blank=True, null=True)
    review = models.TextField(max_length=500, blank=True)
    location_city = models.CharField(max_length=120, blank=True, null=True)
    location_state = models.CharField(max_length=120, blank=True, null=True)
    job_title = models.CharField(max_length=120, blank=True, null=True)
    current_employee = models.CharField(max_length=120, blank=True, null=True)


class Analytics(models.Model):
    collection_id = models.ForeignKey(Collect, related_name='analytics',
                                      on_delete=models.CASCADE, null=True)
    word = models.CharField(max_length=120, blank=True, null=True)
    value = models.IntegerField(blank=True, null=True)

    def get_absolute_url(self):
        return reverse('scrape-api:detail', kwargs={'pk': self.pk})


class WorkFlow(models.Model):
    collection_id = models.ForeignKey(Collect, related_name='flow',
                                      on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=120, blank=True, null=True)
    timestamp = models.CharField(max_length=120, blank=True, null=True)
    details = models.TextField(max_length=500, blank=True)


def pre_save_scrape_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        pass


pre_save.connect(pre_save_scrape_receiver, sender=Collect)
