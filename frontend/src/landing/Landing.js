import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'
import ReactMarkdown from "react-markdown";
import FeedbackForm from "../landing/FeedbackForm";
import ReactLoading from "react-loading";


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: null,
      words: null,
      comms: [],
      about: [],
      aboutCardClass: "shadow card rounded-0 invisible",
      aboutCardAnimate: "",
      animate: false,
      mobile: false,
      previous: null,
      author: false,
      draft: null,
      count: 0,
      pagePosition: null,
      doneLoading: undefined
    };
  }

  checkMobileState = () => {
    const width = document.documentElement.clientWidth;
    if (width <= 768) {
      this.setState({
        mobile: true
      })
    }
    return this.state.mobile
  };

  listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = winScroll / height;
    //
    // console.log('mobile in scroll', this.state.mobile);
    // console.log('animate', this.state.animate);

    this.setState({
      pagePosition: scrolled
    });

    if (scrolled >= .40 && this.state.mobile === false) {
      this.setState({
        animate: true
      });
    }

    if (this.state.animate === true) {
      this.setState({
        aboutCardClass: "shadow card rounded-0",
        aboutCardAnimate: "card-animate"
      })
    }

    if (this.state.mobile === true) {
      this.setState({
        aboutCardClass: "shadow card rounded-0"
      })
    }
  };

  loadComms(nextEndpoint) {
    let endpoint = '/api/comms/';
    if (nextEndpoint !== undefined) {
      endpoint = nextEndpoint
    }
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
        return response.json()
      }).then(function (responseData) {

        thisComp.setState({
          comms: thisComp.state.comms.concat(responseData.results.filter(post => post.slug === 'landing-tag' && post.draft === false)),
          about: thisComp.state.about.concat(responseData.results.filter(post => post.slug === 'about' && post.draft === false)),
          next: responseData.next,
          previous: responseData.previous,
          staff: responseData.staff,
          draft: responseData.draft,
          count: responseData.count,
          doneLoading: true,
        })
      }
    ).catch(function (error) {
      console.log("error", error)
    })
  }

  componentDidMount() {
    this.checkMobileState();
    if (this.state.mobile === false) {
      window.addEventListener('scroll', this.listenToScroll);
    }
    this.setState({
      comms: [],
      about: [],
      next: null,
      previous: null,
      count: 0,
    });

    setTimeout(() => {
      this.loadComms()
    }, 1200);
    console.log(this.state.doneLoading)
  }


  render() {
    const {comms} = this.state;
    const {about} = this.state;
    const {aboutCardClass} = this.state;
    const {aboutCardAnimate} = this.state;
    const {mobile} = this.state;
    const hrStyle = {
      display: 'block',
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      margin: '0 1em',
      padding: '0',
      color: '#18181E'
    };

    return (
      <div>
        {!this.state.doneLoading ? (
          <div className="loading">
            <ReactLoading type={"bars"} color={"white"} height={'15%'}
                          width={'15%'} id='spinner'/>
          </div>
        ) : (
          <div>
            <section className="fork">
              <div className="container" id="top">
                {comms.length > 0 ? comms.map((commItem, index) => {
                  return (
                    <div className="tag">
                      {commItem !== undefined ?
                        <ReactMarkdown source={commItem.content}/>
                        : ""}
                    </div>
                  )
                }) : ""}
                <div class="vl"></div>
                <div className="btn-group-vertical">
                  <div class="container-fluid">
                    <h3>DataSet Builders: </h3>
                    <h5>Select your data source below.</h5>
                    <a id="landing-btn" href="/scrape/">
                      <button class="btn-fill">
                        Yelp
                      </button>
                    </a>
                    <a id="landing-btn" href="/scrape/">
                      <button className="btn-fill">
                        Indeed
                      </button>
                    </a>
                    <Link id="landing-btn" maintainScrollPosition={false} to={{
                      pathname: `/`,
                      state: {fromDashboard: false}
                    }}>
                      <button class="btn-flip">
                        GlassDoor
                      </button>
                    </Link>
                    <Link id="landing-btn" maintainScrollPosition={false} to={{
                      pathname: `/`,
                      state: {fromDashboard: false}
                    }}>
                      <button class="btn-flip">
                        Twitter
                      </button>
                    </Link>
                  </div>
                  <hr style={hrStyle}/>
                </div>
              </div>
            </section>

            <section class="about" id="about">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6 py-2">
                    {about.length > 0 ? about.map((aboutItem, index) => {
                      return (
                        <div className={aboutCardClass} id={aboutCardAnimate}>
                          <h1 class="hook">{aboutItem.title}</h1>
                          <hr style={hrStyle}/>
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Democratizing the Worlds
                              Data</h5>
                            <p className="card-text">
                              {aboutItem !== undefined ?
                                <ReactMarkdown source={aboutItem.content}/>
                                : ""}
                            </p>
                          </div>
                        </div>
                      )
                    }) : ""
                    }
                  </div>
                  <FeedbackForm/>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    )
  }
}

export default Landing