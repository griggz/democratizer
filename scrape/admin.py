from django.contrib import admin
from django.db import models
from .models import Yelp, Results, Analytics
from .forms import YelpForm
from pagedown.widgets import AdminPagedownWidget


class YelpAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }
    list_display = ['id', 'business_name', "scrape_date", "id", 'slug']
    list_filter = ["scrape_date"]
    search_fields = ["business_name"]
    form = YelpForm

    class Meta:
        model = Yelp


admin.site.register(Yelp, YelpAdmin)


class ResultsAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }
    list_display = ['business', "author", "date", 'rating', 'review']
    list_filter = ["business"]
    search_fields = ["business"]

    class Meta:
        model = Results


admin.site.register(Results, ResultsAdmin)


class AnalyticsAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }
    list_display = ['business', "word", "value"]
    list_filter = ["business"]
    search_fields = ["business"]

    class Meta:
        model = Analytics


admin.site.register(Analytics, AnalyticsAdmin)