from django.utils.text import slugify
import random
import string
import json
from pathlib import Path
import re
try:
    from harvstr.settings.local import *
except:
    from harvstr.settings.production import *


def random_string_generator(size=10,
                            chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def unique_slug_generator(instance, new_slug=None):
    """
    This is for a Django project and it assumes your instance
    has a model with a slug field and a title character (char) field.
    """
    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(instance.business_name)
    Klass = instance.__class__
    qs_exists = Klass.objects.filter(slug=slug).exists()
    if qs_exists:
        new_slug = "{slug}-{randstr}".format(
            slug=slug,
            randstr=random_string_generator(size=4)
        )
        return unique_slug_generator(instance, new_slug=new_slug)
    return slug


def build_dict_from_json(json_path):
    """takes JSON Path and outputes a dictionary"""
    if json_path:
        with open(Path(json_path), 'r') as f:
            return json.load(f)


def websiteIdentifier(instance):
    site_dir_dict = build_dict_from_json(ACTIVESITES_JSON)

    for site in site_dir_dict['sites']:
        try:
            if site_dir_dict['sites'][site]['pattern'] in instance.link:
                return site, instance
        except ValueError:
            return 'A valid site pattern was not found...Please update the source JSON file.'


def getBusinessName(link):
    valid_sites = ['www.yelp.com', 'www.glassdoor.com', 'www.indeed.com']
    site = [x for x in valid_sites if x in str(link)].pop()

    biz_switch = {
        'www.yelp.com': [re.split(r'biz/', link)[1].split('?')[0] if 'yelp' in site else 'not a match'],
        'www.glassdoor.com': [link.rsplit('Reviews/', 1)[1].rsplit('-Reviews-')[0] if 'glassdoor' in site else 'not a match'],
        'www.indeed.com': [re.split(r'cmp/', link)[1].split('/')[0] if 'indeed' in site else 'not a match']
    }
    business = biz_switch.get(site)[0]

    return business




