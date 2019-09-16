from __future__ import absolute_import, unicode_literals
from celery.task import task
from django.db import Error
from .models import Yelp
import datetime
from datetime import timedelta


class ObjectsMissingError(Error):
    """Raised when the input value is too large"""
    pass


@task(name='clean_reviews')
def clean_db():
    """This task deletes all records older than 24 hours.
    These records include yelp parent and review child records."""
    # logger = logging.getLogger(__name__)
    time_threshold = datetime.datetime.now() - timedelta(hours=2)
    objects = Yelp.objects.filter(scrape_date__lt=time_threshold)
    # objects = Yelp.objects.all()

    if objects:
        records_removed = objects.delete()
        results = str(records_removed[1]['scrape.Yelp']) + \
                  ' Yelp record(s) and ' + str(
            records_removed[1]['scrape.Results']) + \
                  ' associated reviews have been successfully deleted.'
        return results
    else:
        results = str('No records to delete')
        return results
