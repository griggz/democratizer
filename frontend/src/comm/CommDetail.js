import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

class CommDetail extends Component {
    constructor(props) {
        super(props);
        this.handleCommItemUpdated = this.handleCommItemUpdated.bind(this);
        this.state = {
            slug: null,
            comm: null,
            doneLoading: false,
            owner: null
        }
    }

    handleCommItemUpdated(commItemData) {
        this.setState({
            comm: commItemData
        })
    }

    loadComm(slug) {
        const endpoint = `/api/comms/${slug}/`;
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
                    comm: null
                })
            } else {
                thisComp.setState({
                    doneLoading: true,
                    comm: responseData,
                    owner: responseData.owner,
                });
            }
        }).catch(function (error) {
            console.log("error", error)
        })
    }


    componentDidMount() {
        this.setState({
            slug: null,
            comm: null
        });
        if (this.props.match) {
            const {slug} = this.props.match.params;
            this.setState({
                slug: slug,
                doneLoading: false
            });
            this.loadComm(slug)
        }
    }

    render() {
        const {doneLoading} = this.state;
        const {comm} = this.state;
        const {owner} = this.state;

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
            <p>{(doneLoading === true) ? <div class="Main">
                {comm === null ? "Not Found" :
                    <div className='row'>
                        <div className='col-md-10'>
                            <h1 id='alt'>{comm.title} <small class="text-muted">({comm.slug})</small></h1>
                            <h4 id='alt'>By {comm.author.username}&nbsp;
                                {owner === true ?
                                    <Link className='mr-2'
                                          maintainScrollPosition={false}
                                          to={{pathname: `/site-management/comms/${comm.slug}/edit`,
                                              state: {post: comm}
                                          }}><Button variant="outline-dark"
                                                     type="button" id="edit-button">Edit</Button>
                                    </Link> : ""} </h4>
                            <hr style={hrStyle}/>
                            <h4>
                                <small
                                    className="publish_date"
                                    id='alt'> Updated: <Moment
                                    fromNow
                                    ago>{comm.updated}</Moment> ago&nbsp;
                                </small>
                            </h4>
                            <hr style={hrStyle}/>
                            <p id="alt">
                                <ReactMarkdown
                                    source={comm.content}/>
                            </p>
                        </div>

                        <div className='col-md-2'>
                            <br/>
                        </div>
                    </div>
                }
            </div> : "Loading..."}</p>
        )
    }
}

export default CommDetail