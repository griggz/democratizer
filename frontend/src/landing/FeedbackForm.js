import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import {Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";

class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.feedbackNameRef = React.createRef();
    this.feedbackPhoneNumberRef = React.createRef();
    this.feedbackEmailRef = React.createRef();
    this.feedbackCommentsRef = React.createRef();
    this.state = {
      name: null,
      email: null,
      phone_number: null,
      comments: null,
      redirect: false,
      redirectLink: null,
      errors: {},
      aboutCardClass: "shadow card rounded-0 invisible",
      aboutCardAnimate: "",
      animate: false,
      mobile: false,
    }
  }

  createPost(data) {
    const endpoint = '/api/landing/';
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
          redirectLink: `/`,
        });
        thisComp.clearForm()
      }).catch(function (error) {
        console.log("error", error);
        alert("An error occurred, please try again later.")
      }).then(() => this.setState({redirect: true}));
    }

  }

  // buildRedirect() {
  //     const {slug} = this.state;
  //     const {link} = `scrape/results/${slug}`;
  //     console.log(link);
  //     return (
  //         link.toString)
  // }

  handleSubmit(event) {
    event.preventDefault();
    let data = this.state;

    const {post} = this.props;
    if (post === undefined) {
      this.createPost(data)
    } else {
      this.clearFormRefs();
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
    this.setState({
      [key]: value
    });
  }

  checkMobileState = () => {
    const width = document.documentElement.clientWidth;
    if (width <= 768) {
      this.setState({
        mobile: true
      })
    }
  };

  listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = winScroll / height;

    this.setState({
      pagePosition: scrolled
    });

    if (scrolled >= .53 && this.state.mobile === false) {
      this.setState({
        animate: true
      });
    }

    if (this.state.animate === true) {
      this.setState({
        aboutCardClass: "shadow card rounded-0 h-100",
        aboutCardAnimate: "card-animate"
      })
    }

    if (this.state.mobile === true) {
      this.setState({
        aboutCardClass: "shadow card rounded-0 h-100"
      })
    }
  };

  clearForm(event) {
    if (event) {
      event.preventDefault()
    }
    this.feedbackCreateForm.reset();
    this.defaultState();
  }


  clearFormRefs() {
    this.feedbackNameRef.current = '';
    this.feedbackEmailRef.current = '';
    this.feedbackPhoneNumberRef.current = '';
    this.feedbackCommentsRef.current = '';
  }


  defaultState() {
    this.setState({
      name: '',
      email: '',
      phone_number: '',
      comments: ''
    })
  }

  componentDidMount() {
    this.checkMobileState();
    if (this.state.mobile === false) {
      window.addEventListener('scroll', this.listenToScroll);
    }
    const {post} = this.props;
    if (post !== undefined) {
      this.setState({
        name: post.name,
        email: post.email,
        phone_number: post.phone_number,
        comments: post.comments,
      })
    } else {
      this.defaultState()
    }
  }

  render() {
    const {name} = this.state;
    const {email} = this.state;
    const {phone_number} = this.state;
    const {comments} = this.state;
    const {redirect} = this.state;
    const {redirectLink} = this.state;
    const {aboutCardClass} = this.state;
    const {aboutCardAnimate} = this.state;
    const hrStyle = {
      display: 'block',
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      margin: '0 1em',
      padding: '0',
      color: '#18181E'
    };
    if (redirect) {
      return <Redirect to={redirectLink}/>;
    }
    return (
      <div className="col-sm-6 py-2">
        <div className={aboutCardClass} id={aboutCardAnimate}>
          <form ref={(el) => this.feedbackCreateForm = el}>
            <h1 className="hook">Contact Us</h1>
            <hr style={hrStyle}/>
            <div className="card-body d-flex flex-column">
              <div className='form-group'>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  className='form-control'
                  placeholder='Name'
                  ref={this.feedbackNameRef}
                  onChange={this.handleInputChange}
                  required='required'/>
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  id='email'
                  name='email'
                  value={email}
                  className='form-control'
                  placeholder='Email'
                  ref={this.feedbackEmailRef}
                  onChange={this.handleInputChange}
                  required='required'/>
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  id='phone_number'
                  name='phone_number'
                  value={phone_number}
                  className='form-control'
                  placeholder='Phone Number'
                  ref={this.feedbackPhoneNumberRef}
                  onChange={this.handleInputChange}
                  required='required'/>
              </div>
              <div className='form-group'>
              <textarea
                type='text'
                id='comments'
                name='comments'
                style={{height: '15rem'}}
                value={comments}
                className='form-control'
                placeholder='Say Hi!'
                ref={this.feedbackCommentsRef}
                onChange={this.handleInputChange}
                required='required'/>
              </div>
              <div className="w-100 d-flex flex-column text-center">
                <Button variant="outline-dark" type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default FeedbackForm