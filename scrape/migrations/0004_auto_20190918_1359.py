# Generated by Django 2.2.5 on 2019-09-18 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scrape', '0003_auto_20190918_1329'),
    ]

    operations = [
        migrations.AlterField(
            model_name='yelp',
            name='page_amount',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
