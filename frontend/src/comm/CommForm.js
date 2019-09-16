import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import moment from 'moment'
import ReactMarkdown from "react-markdown";
import {Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";

class CommForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDraftChange = this.handleDraftChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.commTitleRef = React.createRef();
    this.commContentRef = React.createRef();
    this.commSiteLocationRef = React.createRef();
    this.commSlugRef = React.createRef();
    this.state = {
      draft: false,
      title: null,
      content: null,
      site_location: '',
      redirect: false,
      redirectLink: null,
      errors: {},
    }
  }

  createComm(data) {
    const endpoint = '/api/comms/';
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
        thisComp.setState({redirectLink: `/site-management/comms/${responseData.slug}/`});
        if (thisComp.props.newCommItemCreated) {
          thisComp.props.newCommItemCreated(responseData)
        }
        thisComp.clearForm();
      }).catch(function (error) {
        console.log("error", error);
        alert("An error occurred, please try again later.")
      }).then(() => this.setState({redirect: true}));
    }
  }

  updateComm(data) {
    const {post} = this.props;
    const endpoint = `/api/comms/${post.slug}/`;
    const csrfToken = cookie.load('csrftoken');
    let thisComp = this;
    if (csrfToken !== undefined) {
      let lookupOptions = {
        method: "PUT",
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
        thisComp.setState({redirectLink: `/site-management/comms/${responseData.slug}`});
        // console.log(responseData)
        if (thisComp.props.commItemUpdated) {
          thisComp.props.commItemUpdated(responseData)
        }

      }).catch(function (error) {
        console.log("error", error);
        alert("An error occurred, please try again later.")
      }).then(() => this.setState({redirect: true}));
    }

  }

  handleSubmit(event) {
    event.preventDefault();
    let data = this.state;

    const {post} = this.props;
    if (post !== undefined) {
      this.updateComm(data)
    } else {
      this.createComm(data)
    }

  }

  handleInputChange(event) {
    event.preventDefault();
    let key = event.target.name;
    let value = event.target.value;
    if (key === 'title') {
      if (value.length > 120) {
        alert("This title is too long")
      }
    }
    this.setState({
      [key]: value
    })
  }

  handleDraftChange(event) {
    this.setState({
      draft: !this.state.draft
    })
  }

  clearForm(event) {
    if (event) {
      event.preventDefault()
    }
    this.commCreateForm.reset();
    this.defaultState()
  }


  clearFormRefs() {
    this.commTitleRef.current = '';
    this.commContentRef.current = '';
    this.commSiteLocationRef.current = '';
    this.commSlugRef.current = ''
  }


  defaultState() {
    this.setState({
      draft: false,
      title: null,
      content: null,
      site_location: null,
      slug: null
    });
  }

  componentDidMount() {
    const {post} = this.props;
    if (post !== undefined) {
      this.setState({
        draft: post.draft,
        title: post.title,
        content: post.content,
        site_location: post.site_location,
        slug: post.slug
      })
    } else {
      this.defaultState()
    }
    // this.commTitleRef.current.focus()
  }

  render() {
    const {title} = this.state;
    const {content} = this.state;
    const {site_location} = this.state;
    const {redirect} = this.state;
    const {redirectLink} = this.state;
    const {slug} = this.state;
    if (redirect) {
      return <Redirect to={redirectLink}/>;
    }
    return (
      <div>
        <h1 id='alt'>Create Comm</h1>
        <form onSubmit={this.handleSubmit}
              ref={(el) => this.commCreateForm = el}>
          <div className='form-group' id='top-row-form'>
            <label htmlFor='draft'>
              <input type='checkbox'
                     checked={this.state.draft}
                     id='draft'
                     name='draft'
                     className='mr-2'
                     onChange={this.handleDraftChange}/>
            </label>
            <Button variant="outline-dark"
                    onClick={(event) => {
                      event.preventDefault();
                      this.handleDraftChange()
                    }}>Draft
            </Button>
            <label htmlFor='site_location'>Site Location:<span> </span>
              <select value={site_location}
                      id='site_location'
                      name='site_location'
                      ref={this.commSiteLocationRef}
                      className='mr-2'
                      onChange={this.handleInputChange}>
                <option value="select">Select</option>
                <option value="comms">comms</option>
                <option value="scrape">scrape</option>
                <option value="landing">landing</option>
              </select>
            </label>
            <button type='submit' className='btn btn-primary'
                    id='create-submit'>Save
            </button>
          </div>
          <div className='form-group'>
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              className='form-control'
              placeholder='Comms Title'
              ref={this.commTitleRef}
              onChange={this.handleInputChange}
              required='required'/>
          </div>
          <div className='form-group'>
            <input
              type='text'
              id='slug'
              name='slug'
              readOnly value={slug}
              className='form-control'
              // placeholder='Comms Title'
              ref={this.commSlugRef}
              // onChange={this.handleInputChange}
              // required='required'
            />
          </div>
          <div className='form-group'>
            <label for='content'>
              <small>Markdown <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank" rel="noopener noreferrer">guide</a> For local
                images use this ex. "/static/images/deploy_process.svg"
              </small>
            </label>
            <textarea
              id='content'
              ref={this.commContentRef}
              name='content'
              value={content}
              className='form-control'
              placeholder='Tell me something!'
              onChange={this.handleInputChange}
              required='required'/>

          </div>
          <div className="preview">
            <div className="preview-text">
              <ReactMarkdown source={content}/>
            </div>
          </div>
        </form>
      </div>
    )
  }

}

export default CommForm