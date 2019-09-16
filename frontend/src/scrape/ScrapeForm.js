import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import {Redirect} from "react-router-dom";
import Loader from 'react-loader-spinner';

class ScrapeForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.scrapeLinkRef = React.createRef();
        this.state = {
            link: null,
            redirect: false,
            redirectLink: null,
            slug: null,
            scraping: null,
            errors: {}
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
                    thisComp.setState({redirectLink: `/scrape/results/${responseData.slug}`, scraping: null});
                    // console.log(`scrape/results/${responseData.slug}`);
                thisComp.clearForm()
            }).catch(function (error) {
                console.log("error", error);
                alert("An error occurred, please try again later.")
            }).then(() => this.setState({ redirect: true }));
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

        const {scrape} = this.props;
        if (scrape === undefined) {
        this.setState({scraping: true});
        this.createScrape(data)
        }
        else {
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

    clearForm(event) {
        if (event) {
            event.preventDefault()
        }
        this.scrapeCreateForm.reset();
        this.defaultState();
    }


    clearFormRefs() {
        this.scrapeLinkRef.current = '';
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
            })
        } else {
            this.defaultState()
        }
        // this.postTitleRef.current.focus()
    }

    render() {
        const {link} = this.state;
        const { redirect } = this.state;
        const { redirectLink } = this.state;
        const { scraping } = this.state;
        if (scraping) {
            return <div id="react-loader"><Loader type="Puff" color="#00BFFF" height="200" width="200" /> ......scraping</div>
        }
        if (redirect) {
        return <Redirect to={redirectLink}/>;
        }
        return (
            <form onSubmit={this.handleSubmit} ref={(el) => this.scrapeCreateForm = el}>
                <div className='form-group'>
                    <input
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
                <button type='submit' className='btn btn-primary'>Scrape</button>
                 &nbsp;
                <button className={`btn btn-secondary`}
                        onClick={this.clearForm}>Clear</button>
            </form>
        )
    }

}

export default ScrapeForm