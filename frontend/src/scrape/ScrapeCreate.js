import React, {Component} from 'react'
import ScrapeForm from './ScrapeForm'
import cookie from "react-cookies";
import ReactMarkdown from "react-markdown";

class ScrapeCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: null,
            comms: [],
            commsListClass: "card",
            previous: null,
            author: false,
            draft: null,
            count: 0
        };
    }

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
                    comms: thisComp.state.comms.concat(responseData.results.filter(post => post.site_location === 'scrape' && post.draft === false)),
                    next: responseData.next,
                    previous: responseData.previous,
                    staff: responseData.staff,
                    draft: responseData.draft,
                    count: responseData.count
                })
            }
        ).catch(function (error) {
            console.log("error", error)
        })
    }

    componentDidMount() {
        this.setState({
            comms: [],
            next: null,
            previous: null,
            count: 0
        });
        this.loadComms()
    }

    render() {
        const {comms} = this.state;
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
            <div class="container col-sm-10">
                <div className="scrape_form">
                    <ScrapeForm/>
                </div>
                {comms.length > 0 ? comms.map((commItem, index) => {
                    return (
                        <div className="comms">
                            <h1 class="side-lines--double">Instructions</h1>
                            {commItem !== undefined ?
                                <ReactMarkdown source={commItem.content}/>
                                : ""}
                        </div>
                    )
                }) : <p>No Messages To Display</p>
                }
            </div>
        )
    }

}

export default ScrapeCreate