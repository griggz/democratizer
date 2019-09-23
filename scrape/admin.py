from django.contrib import admin
from django.db import models
from .models import Collect, Results, Analytics, WorkFlow, IndeedResults
from .forms import YelpForm
from pagedown.widgets import AdminPagedownWidget


class ScrapeAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }
    list_display = ['id', 'site', 'business_name', "scrape_date", "id", 'slug']
    list_filter = ["scrape_date"]
    search_fields = ["business_name"]
    form = YelpForm

    class Meta:
        model = Collect


admin.site.register(Collect, ScrapeAdmin)


class ResultsAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }
    list_display = ['collection_id', "date", 'rating', 'review']
    list_filter = ["collection_id"]
    search_fields = ["collection_id"]

    class Meta:
        model = Results


admin.site.register(Results, ResultsAdmin)


class IndeedResultsAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }
    list_display = ['collection_id', "date", 'rating', 'review']
    list_filter = ["collection_id"]
    search_fields = ["collection_id"]

    class Meta:
        model = Results


admin.site.register(IndeedResults, IndeedResultsAdmin)


class AnalyticsAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }
    list_display = ['collection_id', "word", "value"]
    list_filter = ["collection_id"]
    search_fields = ["collection_id"]

    class Meta:
        model = Analytics


admin.site.register(Analytics, AnalyticsAdmin)


class WorkflowAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }
    list_display = ['collection_id', "status", "timestamp"]
    list_filter = ["collection_id"]
    search_fields = ["collection_id"]

    class Meta:
        model = WorkFlow


admin.site.register(WorkFlow, WorkflowAdmin)