import os
import math
import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import requests
import time
import re

from scrape.scripts.glassdoor.attempt import trial

MAX_ATTEMPTS = 20


@trial(max_trial=MAX_ATTEMPTS)
def _get_number_of_pages(url, hdr):
    """fetch total number of review pages from glassdoor"""
    # fetch the content using url provided
    html_page = requests.get(url, headers=hdr)

    # Parse html content
    page_content = BeautifulSoup(html_page.content, 'html.parser')

    # ID Max Number of Pages
    # Gather number of reviews meta data from page link
    num_of_reviews_tag = page_content.find(
        attrs={'class': 'padTopSm margRtSm margBot minor'})
    num_of_reviews = float(
        num_of_reviews_tag.text.split(' ')[0].replace(",", ''))

    # Glassdoor lists 10 reviews /page
    num_of_pages = math.ceil(num_of_reviews / 10)
    html_loaded = True

    return num_of_pages


def _get_page_content(url, page_, hdr):
    """gather_page_content"""

    # Get URL
    page_url = re.sub(r'\.htm$', '', url) + '_P' + str(page_) + \
        '.htm?sort.sortType=RD&sort.ascending=false'
    session = requests.Session()
    html_page = session.get(page_url, headers=hdr)
    session.close()

    # Parse HTML with BeautifulSoup
    page_content = BeautifulSoup(html_page.text, 'html.parser')

    return page_content


@trial(max_trial=MAX_ATTEMPTS)
def _get_reviews(url, page_, hdr):
    """getting reviews"""

    print('Loading page: ' + str(page_) + ' ... ',
          end='',
          flush=True)

    page_content = _get_page_content(url, page_, hdr)

    # Gather all Data: reviews, date, rating, location, title
    overall_rating = page_content.findAll(
        attrs={'class': 'value-title'})
    pros = page_content.findAll(
        attrs={'class':
               ' pros mainText truncateThis wrapToggleStr'})
    cons = page_content.findAll(
        attrs={'class':
               ' cons mainText truncateThis wrapToggleStr'})
    date = page_content.findAll(
        attrs={'class': 'date subtle small'})
    job_title = page_content.findAll(
        attrs={'class': 'authorJobTitle reviewer'})

    # Create Dictionary From Scraped Info
    # first page structured differently
    if page_ == 1:
        # this happens randomly
        if len(pros) == len(date):
            data_ = {
                'Overall_Rating': [float(x['title'])
                                   for x in overall_rating[1:]],
                'Pros': [x.text for x in pros],
                'Cons': [x.text for x in cons],
                'Date': [x['datetime'] for x in date],
                'Current_Employee': [x.text.split('-')[0] for x in job_title],
                'Job_Title': [x.text.split('-')[1] for x in job_title]}
        else:
            data_ = {
                'Overall_Rating': [float(x['title'])
                                   for x in overall_rating[2:]],
                'Pros': [x.text for x in pros[1:]],
                'Cons': [x.text for x in cons[1:]],
                'Date': [x['datetime'] for x in date],
                'Current_Employee': [x.text.split('-')[0]
                                     for x in job_title[1:]],
                'Job_Title': [x.text.split('-')[1] for x in job_title[1:]]}
    else:
        data_ = {
            'Overall_Rating': [float(x['title']) for x in overall_rating],
            'Pros': [x.text for x in pros],
            'Cons': [x.text for x in cons],
            'Date': [x['datetime'] for x in date],
            'Current_Employee': [x.text.split('-')[0] for x in job_title],
            'Job_Title': [x.text.split('-')[1] for x in job_title]}

    # check if loaded properly
    if len(data_['Overall_Rating']) != len(data_['Pros']):
        raise Exception('length error')

    print('Page loaded successfully! Data length:',
          len(data_['Overall_Rating']))
    return pd.DataFrame(data_)


def glassdoor_reviews_for_business(url, pages="all"):
    """
    This module scrapes reviews from the Glassdoor website.

    Parameters
    ----------
    url : str
        Glassdoor's main review page url
    pages : int or 'all', optional (default = 'all')
        number of review pages that needs to be scraped. Each page has
        10 reviews in it
        If 'all', all pages will be reviewed.

    Returns
    -------
    df_reviews_final : DataFrame
        DataFrame of all the reviews

    Notes
    -----
    If after 5 tries, it cannot load a review page, it
    will skip the page and continues. If 'pages' is set to all and it cannot
    load the number of pages it will return -1.
    """

    # header
    hdr = {'User-Agent': 'Mozilla/5.0',
           'Cache-Control': 'no-cache'}

    if pages == 'all':
        num_of_pages = _get_number_of_pages(url, hdr)
        if num_of_pages == -1:
            print('Error: Cannot load the page properly!')
            return -1
    else:
        try:
            num_of_pages = int(pages)
        except BaseException:
            print('Error: "pages" must be an integer or "all"')
            return -1

    if num_of_pages == 1:
        print('1 page will be loaded!')
    else:
        print(num_of_pages, 'pages will be loaded!')

    # Initialize Final DataFrames
    df_reviews_final = pd.DataFrame()

    for page_ in range(1, num_of_pages + 1):
        df_reviews_final = df_reviews_final.append(_get_reviews(url, page_,
                                                                hdr))

    df_reviews_final.reset_index(drop=True, inplace=True)

    print(len(df_reviews_final), 'reviews loaded!')

    return df_reviews_final
