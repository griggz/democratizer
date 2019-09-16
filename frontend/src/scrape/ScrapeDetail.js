import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'
import ScrapeInline from "../scrape/ScrapeInline";
import {Redirect} from "react-router-dom";
import csvDownload from 'json-to-csv-export'
import Button from 'react-bootstrap/Button';


class ScrapeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: null,
      scrape: null,
      doneLoading: false,
      visible: 25,
      words: null,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 25};
    });
  }

  handlePostItemUpdated(scrapeItemData) {
    this.setState({
      scrape: scrapeItemData
    })
  }

  loadReviews(slug) {
    const endpoint = `/api/scrape/${slug}/`;
    let thisComp = this;
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const csrfToken = cookie.load('csrftoken');
    if (csrfToken !== undefined) {
      lookupOptions['credentials'] = 'include';
      lookupOptions['headers']['X-CSRFToken'] = csrfToken
    }

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        if (response.status === 404) {
          console.log('Page not found')
        }
        return response.json()
      }).then(function (responseData) {
      if (responseData.detail) {
        thisComp.setState({
          doneLoading: true,
          scrape: null
        })
      } else {
        thisComp.setState({
          doneLoading: true,
          scrape: responseData
        })
      }
    }).catch(function (error) {
      console.log("error", error)
    })
  }

  componentDidMount() {
    this.setState({
      slug: null
    });
    if (this.props.match) {
      const {slug} = this.props.match.params;
      this.setState({
        slug: slug,
        doneLoading: false
      });
      this.loadReviews(slug);
    }
  }

  buildUrl() {
    const {scrape} = this.state;
    return (
      `https://vvayne.io/scrape/results/${scrape.slug}`)
  }

  buildFileName() {
    const {scrape} = this.state;
    return (
      `${scrape.business_name}.csv`
    )
  }

  static routeChange() {
    let path = `/scrape/create`;
    return (
      <Redirect to={path}/>
    )
  }

  // runTextAnalysis() {
  //     const {scrape} = this.state;
  // }


  render() {
    const {doneLoading} = this.state;
    const {scrape} = this.state;
    // console.log(scrape);
    const hrStyle = {
      display: 'block',
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      margin: '1em 0',
      padding: '0',
      color: 'white'
    };

    return (
      <section className="Results"> {(doneLoading === true) ?
        <div
          className="container-fluid"> {scrape === null ? "No Reviews Found...In order to use this\n" +
          "scraper you must be a registered user and\n" +
          "logged in. If you are logged in and receiving\n" +
          "this error, please confirm that the business\n" +
          "you are attempting to scrape has reviews." :

          <div className="row justify-content-md-center">
            <div className="col-sm-10">
              <Link maintainScrollPosition={false} to={{
                pathname: `/scrape`,
                state: {fromDashboard: false}
              }}>
                <button className={`btn btn-primary`}>New
                  Scrape
                </button>
              </Link>
              <br/>
              {/*<ScrapeChart words={scrape.analytics}/>*/}
              <br/>
              <h1>{scrape.business_name}</h1>
              <Button variant="secondary"
                      onClick={() => csvDownload(scrape.reviews, this.buildFileName())}>
                Download Data
              </Button>
              <hr style={hrStyle}/>
              {scrape.reviews.length > 0 ? scrape.reviews.slice(0, this.state.visible).map((Item, index) => {
                return (
                  <div className="row" key={index}>
                    <ScrapeInline reviews={Item}/>
                  </div>)
              }) : <p>No Reviews Found</p>}
              {this.state.visible < scrape.reviews.length &&
              <div className="d-flex flex-column text-center">
                <Button onClick={this.loadMore}
                        variant="outline-light" type="button"
                        className="load-more">Load more</Button>
              </div>
              }
            </div>
          </div>
        }
        </div> : <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span></div>}</section>
    )
  }
}

export default ScrapeDetail