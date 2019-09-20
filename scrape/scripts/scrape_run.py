from ..models import Yelp, Results
from ..forms import YelpForm
from django.contrib import messages
from ..scripts.scrape_yelp import scrape
import pandas as pd


class YelpScrape:
    def __init__(self, instance, instance_id):
        self.link = instance.link
        self.instance_id = instance_id
        self.business_name = None
        self.page_amount = None
        self.instance = instance
        self.results = self.scrape_yelp()

    def scrape_yelp(self):
        results, biz_name = scrape(self.link, self.instance.page_amount)
        results = pd.DataFrame(results)
        self.business_name = biz_name

        return results

    def process_results(self):
        for row in self.results.itertuples():
            # add some custom validation\parsing for some of the fields
            yelp_obj = Yelp.objects.get(id=self.instance_id)
            slug = yelp_obj.slug
            instance = Results(business=yelp_obj, author=row.author,
                               date=row.date, rating=row.rating,
                               review=row.reviews)
            try:
                instance.save()
            except:
                pass


# def create_scrape(request):
#     # if not request.user.is_staff or not request.user.is_superuser:
#     #     raise Http404
#     yelp_form = YelpForm(request.POST or None, request.FILES or None)
#     if yelp_form.is_valid():
#         instance = yelp_form.save()
#         instance.user = request.user
#         scraper = YelpScrape(instance.link, instance.id)
#         scraper.scrape_yelp()
#         instance.business_name = scraper.business_name
#         # instance.slug = slugit(instance)
#         instance.save()
#         scraper.process_results()
#         messages.success(request, '{}'.format(str(instance.link)), 'has been scraped!')
