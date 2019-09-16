"""
This code scrapes the yelp link you provide for reviews and outputes them into csv file.

sample 1: 'python reviews.py -l https://www.yelp.com/biz/schoolsfirst-federal-credit-union-santa-ana-5`

"""
from lxml import html
import requests
import argparse
import os
import pandas as pd


def data_set(data, biz):
    """Collects review, formats, and exports to csv."""
    df = pd.DataFrame(data)

    cnt_records = len(df)

    biz = str(biz)

    if not os.path.isfile('{}_reviews.csv'.format(biz)):
        df.to_csv('data/{}_reviews.csv'.format(biz), index=False,
                  header='column_names')
    else:  # else it exists, overwrite
        df.to_csv('data/{}_reviews.csv'.format(biz), index=False,
                  header='column_names')

    print(cnt_records, "reviews scraped and exported to",
          'data/{}_reviews.csv'.format(biz))


def _fetch_reviews(link, num_pages):
    """
    gathers the reviews from the link/business provided using
    NUM PAGES as the limit of pages to crawl. NOTE: 1
    page = 20 reviews.
    """

    biz_url = link.rsplit('biz/', 1)
    if '?' in biz_url[1]:
        business = biz_url[1].split('?')[0]
    else:
        business = biz_url[1]
    start_url = ['http://www.yelp.com/biz/%s' % business]
    biz_reviews = []
    cnt = 0
    offset = 0

    for url in start_url:
        page_ = 0
        while True:
            # if num_pages == None it will scrape all reviews
            if num_pages is not 0:
                page_ += 1
                if page_ > num_pages:
                    break

            page = requests.get(url + "?start=%s" % offset)
            parser = html.fromstring(page.text)
            reviews = parser.xpath('//div[@itemprop="review"]')
            offset += 20
            cnt += 1
            if reviews:
                for rev in reviews:
                    author = rev.xpath('.//meta[@itemprop="author"]/@content')
                    date = rev.xpath(
                        './/meta[@itemprop="datePublished"]/@content')
                    rating = rev.xpath(
                        './/meta[@itemprop="ratingValue"]/@content')
                    reviews = rev.xpath('.//p[@itemprop="description"]/text()')
                    for data in zip(author, date, rating, reviews):
                        resp = {'author': data[0], 'date': data[1],
                                'rating': data[2], 'reviews': data[3]}
                        biz_reviews.append(resp)
            else:
                print('page', cnt, 'had no reviews...ending.')
                break
            print('page {}'.format(cnt), 'scraped...')
    return biz_reviews, str(business)


def scrape(link, num_pages=0):
    """
    Scrapes review from the Yelp page

    Parameters
    ----------
    link : str
        link to the yelp page
        e.g. https://www.yelp.com/biz/the-gallup-organization-washington
    num_pages : int, optional (default = 0)
        number of pages to be scraped
        If 0, scrapes all of pages

    Returns
    -------
    reviews : DataFrame
        reviews
    """

    # Assign returned tuple
    reviews, biz_title = _fetch_reviews(link, num_pages)

    # return data_set(reviews, biz_title)

    return reviews, biz_title

# def meta_scrape(link):


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('-p', '--num_pages',
                        default=0, type=int, required=False,
                        help='enter the number of pages you would like reviews'
                             'to be pulled from. NOTE: 20 reviews per page.')

    parser.add_argument('-l', '--link',
                        default=False, type=str, required=True,
                        help='enter link to business...')

    args_dict = vars(parser.parse_args())

    num_pages = args_dict['num_pages']
    link = args_dict['link']

    scrape(link, num_pages)


if __name__ == '__main__':
    main()
