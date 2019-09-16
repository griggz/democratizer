from django.db import models
from django.urls import reverse
from django.db.models.signals import pre_save
from .utils import unique_slug_generator
from django.conf import settings
from django.utils import timezone
from markdown_deux import markdown
from django.utils.safestring import mark_safe
from django.contrib.contenttypes.models import ContentType


class CommsManager(models.Manager):
    def active(self, *args, **kwargs):
        return super(CommsManager, self).filter(draft=False).filter(
            updated__lte=timezone.now())


class Comms(models.Model):
    comms = 'comms'
    scrape = 'scrape'
    landing = 'landing'
    APP_CHOICES = [
        (comms, 'comms'),
        (scrape, 'scrape'),
        (landing, 'landing'),
    ]
    site_location = models.CharField(
        max_length=2,
        choices=APP_CHOICES
    )
    author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1,
                               on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, blank=True, null=True)
    content = models.TextField()
    draft = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    # meta = models.CharField(max_length=120, blank=True, null=True)

    objects = CommsManager()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('comms:detail', kwargs={'slug': self.slug})

    class Meta:
        ordering = ["-updated"]

    def get_markdown(self):
        content = self.content
        markdown_text = markdown(content)
        return mark_safe(markdown_text)

    @property
    def get_content_type(self):
        instance = self
        content_type = ContentType.objects.get_for_model(instance.__class__)
        return content_type


def pre_save_post_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)

    # if instance.content:
    #     html_string = instance.get_markdown()
    #     read_time = get_read_time(html_string)
    #     instance.read_time = read_time


pre_save.connect(pre_save_post_receiver, sender=Comms)
