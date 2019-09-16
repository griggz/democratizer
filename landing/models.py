from django.db import models
from django.conf import settings
from markdown_deux import markdown
from django.utils.safestring import mark_safe


# Create your models here.
class Feedback(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    name = models.CharField(max_length=120, null=True, blank=True)
    email = models.EmailField(max_length=254, null=True, blank=False)
    phone_number = models.CharField(max_length=120, null=True, blank=True)
    comments = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    def save(self, **kwargs):
        return super(Feedback, self).save(**kwargs)


class About(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    title = models.CharField(max_length=500, blank=True, null=True)
    post_image = models.CharField(max_length=120, null=True, blank=True,)
    unsplash_url = models.CharField(max_length=120, null=True, blank=True, )
    height_field = models.IntegerField(default=900)
    width_field = models.IntegerField(default=1440)
    content = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    def get_markdown(self):
        content = self.content
        markdown_text = markdown(content)
        return mark_safe(markdown_text)
