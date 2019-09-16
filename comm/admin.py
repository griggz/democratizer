from django.contrib import admin
from django.db import models
from .models import Comms
from .forms import CommsForm
from pagedown.widgets import AdminPagedownWidget


class CommsAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget},
    }
    list_display = ["site_location", "title", "updated"]
    list_filter = ["site_location"]
    search_fields = ["title", "content", "location"]
    form = CommsForm

    class Meta:
        model = Comms


admin.site.register(Comms, CommsAdmin)
