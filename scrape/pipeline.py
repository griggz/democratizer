from scrape.scripts.indeed.indeed import scrape_indeed
import pandas as pd
from scrape.utils import websiteIdentifier
from scrape.models import Collect, Results, WorkFlow, IndeedResults
from scrape.scripts.yelp.scrape_yelp import scrape as scrape_yelp
from prefect import task, Flow, Parameter
import pendulum


# import datetime
# from prefect.utilities.logging import get_logger
# import logging
# import prefect


def timestamper(task, old_state, new_state):
    """
    Task state handler that timestamps new states
    and logs the duration between state changes using
    the task's logger.
    """
    new_state.timestamp = pendulum.now("utc")
    if hasattr(old_state, "timestamp"):
        duration = (new_state.timestamp - old_state.timestamp).in_seconds()
        task.logger.info(
            "{} seconds passed in between state transitions".format(duration)
        )
    return new_state


# class LogHandler(logging.StreamHandler):
#     # def __init__(self, instance_id):
#     #     super().__init__(instance_id)
#     #     self.instance_id = instance_id
#
#     def emit(self, record):
#         print('THIS IS THE RECORD')
#         # yelp_obj = Collect.objects.get(id=self.instance_id)
#         instance = WorkFlow(collection_id=97, status=record.exc_info,
#                             details=record.msg,
#                             timestamp=datetime.datetime.now())
#         try:
#             instance.save()
#         except Exception as exc:
#             formatted = "Unexpected error, cannot save logs!: {}".format(
#                 repr(exc))
#             raise Exception(formatted)


@task(name='Analyze Website Url', state_handlers=[timestamper])
def get_website(instance):
    """Get a list of data"""
    link_type, instance = websiteIdentifier(instance)
    return link_type, instance


@task(name='Scrape Website', state_handlers=[timestamper])
def gather_data(head):
    """Multiply the input by 10"""
    # logger = prefect.context.get("logger")

    runner_switch = {
        'yelp': scrape_yelp,
        'indeed': scrape_indeed
    }

    data = runner_switch.get(head[0])(head[1].link, head[1].page_amount)

    return pd.DataFrame(data), head[1]


@task(name='Upload Results to Database', state_handlers=[timestamper])
def upload_yelp_data(data):
    print()
    """Print the data to indicate it was received"""
    # logger = prefect.context.get("logger")
    for row in data[0].itertuples():
        # add some custom validation\parsing for some of the fields
        yelp_obj = Collect.objects.get(id=data[1].id)
        instance = Results(collection_id=yelp_obj, author=row.author,
                           date=row.date, rating=row.rating,
                           review=row.reviews)
        try:
            instance.save()
        except Exception as exc:
            formatted = "Unexpected error, cannot upload data to database!: {}".format(
                repr(exc))
            raise Exception(formatted)


@task(name='Upload Results to Database', state_handlers=[timestamper])
def upload_indeed_data(data):
    print()
    """Print the data to indicate it was received"""
    # logger = prefect.context.get("logger")
    for row in data[0].itertuples():
        # add some custom validation\parsing for some of the fields
        yelp_obj = Collect.objects.get(id=data[1].id)
        instance = IndeedResults(collection_id=yelp_obj,
                                 date=row.Date, rating=row.Rating,
                                 review=row.Review,
                                 location_city=row.Location_City,
                                 location_state=row.Location_State,
                                 job_title=row.Job_Title,
                                 current_employee=row.Current_Employee)
        try:
            instance.save()
        except Exception as exc:
            formatted = "Unexpected error, cannot upload data to database!: {}".format(
                repr(exc))
            raise Exception(formatted)


def run_flow(data):
    site = websiteIdentifier(data)[0]
    upload_dispatcher = {
        'yelp': upload_yelp_data,
        'indeed': upload_indeed_data
    }
    with Flow('ScrapeData') as flow:
        instance = Parameter("instance")
        get_type = get_website(instance=instance)
        scrape = gather_data(get_type)
        upload_dispatcher.get(site)(scrape)

    # now attach our custom handler to Task B's logger
    flow.run(instance=data)
