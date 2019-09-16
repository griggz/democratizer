from django.contrib import admin
from .models import Feedback, About
from pagedown.widgets import AdminPagedownWidget
from django.db import models
from .forms import AboutMeForm


class FeedbackAdmin(admin.ModelAdmin):
    list_display = ["timestamp"]
    list_filter = ["timestamp"]
    search_fields = ["comments"]

    class Meta:
        model = Feedback


admin.site.register(Feedback, FeedbackAdmin)


class AboutMeAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }
    list_display = ["title", "updated"]
    form = AboutMeForm

    class Meta:
        model = About


admin.site.register(About, AboutMeAdmin)