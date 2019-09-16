# Generated by Django 2.2.5 on 2019-09-05 18:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Yelp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('business_name', models.CharField(blank=True, max_length=120, null=True)),
                ('link', models.CharField(max_length=120)),
                ('scrape_date', models.DateTimeField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, null=True, unique=True)),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Results',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(blank=True, max_length=120, null=True)),
                ('date', models.CharField(blank=True, max_length=120)),
                ('rating', models.CharField(blank=True, max_length=120, null=True)),
                ('review', models.TextField(blank=True, max_length=500)),
                ('business', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='scrape.Yelp')),
            ],
        ),
        migrations.CreateModel(
            name='Analytics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(blank=True, max_length=120, null=True)),
                ('value', models.IntegerField(blank=True, null=True)),
                ('business', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='analytics', to='scrape.Yelp')),
            ],
        ),
    ]
