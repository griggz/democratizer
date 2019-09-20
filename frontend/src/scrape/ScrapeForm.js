import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import {Redirect} from "react-router-dom";
import Loader from 'react-loader-spinner';
import validate from './ScrapeFormValidationRules'
import {breakStatement} from "@babel/types";


class ScrapeForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.scrapeLinkRef = React.createRef();
    this.scrapePagesRef = React.createRef();
    this.state = {
      link: null,
      pages_amount: null,
      redirect: false,
      redirectLink: null,
      slug: null,
      scraping: null,
      errors: null,
    }
  }

  createScrape(data) {
    const endpoint = '/api/scrape/';
    const csrfToken = cookie.load('csrftoken');
    let thisComp = this;
    if (csrfToken !== undefined) {
      let lookupOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(data),
        credentials: 'include'
      };

      fetch(endpoint, lookupOptions)
        .then(function (response) {
          return response.json()
        }).then(function (responseData) {
        thisComp.setState({
          redirectLink: `/scrape/results/${responseData.slug}`,
          scraping: null
        });
        // console.log(`scrape/results/${responseData.slug}`);
        thisComp.clearForm()
      }).catch(function (error) {
        console.log("error", error);
        alert("An error occurred, please try again later.")
      }).then(() => this.setState({redirect: true}));
    }

  }

  handleSubmit(event) {
    event.preventDefault();
    let data = this.state;
    const {scrape} = this.props;
    const verify = validate(data);

    if (scrape === undefined) {
      if (Object.keys(verify).length > 0) {
        this.setState({errors: verify});
        // console.log('ERRORS', verify)
      } else if (Object.keys(verify).length === 0) {
        this.setState({scraping: true});
        this.createScrape(data)
      } else {
        this.clearFormRefs();
      }
    }
  }

  handleInputChange(event) {
    event.preventDefault();
    let key = event.target.name;
    let value = event.target.value;
    if (key === 'link') {
      if (value.length > 120) {
        alert("This link is too long")
      }
    }
    if (key === 'page_amount') {
      if (parseInt(value) > 100) {
        alert("This app can't process more than 100 pages.")
      }
    }
    this.setState({
      [key]: value
    });
  }

  clearForm(event) {
    if (event) {
      event.preventDefault()
    }
    this.scrapeCreateForm.reset();
    this.defaultState();
  }


  clearFormRefs() {
    this.scrapeLinkRef.current = '';
    this.scrapePagesRef.current = '';
  }


  defaultState() {
    this.setState({
      link: null,
    })
  }

  componentDidMount() {
    const {scrape} = this.props;
    if (scrape !== undefined) {
      this.setState({
        link: scrape.link,
        page_number: scrape.page_number,
      })
    } else {
      this.defaultState()
    }
    // this.postTitleRef.current.focus()
  }

  render() {
    const {link} = this.state;
    const {page_amount} = this.state;
    const {redirect} = this.state;
    const {redirectLink} = this.state;
    const {scraping} = this.state;
    const {errors} = this.state;

    if (scraping) {
      return <div id="react-loader">
        <Loader type="Puff" color="#00BFFF"
                height="200"
                width="200"/> ...gathering data </div>
    }
    if (redirect) {
      return <Redirect to={redirectLink}/>;
    }
    return (
      <form onSubmit={this.handleSubmit}
            ref={(el) => this.scrapeCreateForm = el}>
        <div className='form-group'>
          {errors === null ? "" :
            <label htmlFor='link'>
              <small className="errors">{errors['link']}</small>
            </label>}
          < input
            type='text'
            id='link'
            name='link'
            value={link}
            className='form-control'
            placeholder='Yelp Link'
            ref={this.scrapeLinkRef}
            onChange={this.handleInputChange}
            required='required'/>
        </div>
        <div className='form-group'>
          <input
            type='number'
            id='page_amount'
            name='page_amount'
            value={page_amount || ''}
            className='form-control'
            placeholder='Number of pages | NOTE: leave blank if you want to scrape ALL pages'
            ref={this.scrapePagesRef}
            onChange={this.handleInputChange}/>
        </div>
        <button type='submit' className='btn btn-primary'>Scrape</button>
        &nbsp;
        <button className={`btn btn-secondary`}
                onClick={this.clearForm}>Clear
        </button>
      </form>
    )
  }

}

export default ScrapeForm