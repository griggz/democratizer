import React, {Component} from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies'
import CommInline from './CommInline'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import Moment from "react-moment";

class Comms extends Component {

    constructor(props) {
        super(props);
        this.toggleCommListClass = this.toggleCommListClass.bind(this);
        this.handleNewComm = this.handleNewComm.bind(this);
        this.loadMoreComms = this.loadMoreComms.bind(this);
        this.state = {
            comms: [],
            commsPublic: [],
            commsListClass: "card",
            previous: null,
            author: false,
            draft: null,
            count: 0
        }
    }

    loadMoreComms() {
        const {next} = this.state;
        if (next !== null || next !== undefined) {
            this.loadComms(next)
        }

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
                // let currentcomms = thisComp.state.comms;
                // let allcomms = currentcomms.concat(responseData.results);
                let commsPublicList = responseData.results.filter(comm => comm.draft === false);

                thisComp.setState({
                    comms: thisComp.state.comms.concat(responseData.results),
                    commsPublic: thisComp.state.commsPublic.concat(commsPublicList),
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

    handleComms(responseData) {
        let comms = responseData.filter(comm => comm.draft === false);
        this.setState({
            commsPublic: comms
        })
    }

    handleNewComm(commItemData) {
        // console.log(commItemData)
        let currentcomms = this.state.comms;
        currentcomms.unshift(commItemData); // unshift
        this.setState({
            comms: currentcomms
        })
    }


    toggleCommListClass(event) {
        event.preventDefault();
        let currentListClass = this.state.commsListClass;
        if (currentListClass === "") {
            this.setState({
                commsListClass: "card",
            })
        } else {
            this.setState({
                commsListClass: "",
            })
        }

    }

    componentDidMount() {
        this.setState({
            comms: [],
            commsListClass: "card",
            next: null,
            previous: null,
            // author: true,
            count: 0
        });
        this.loadComms()
    }

    render() {
        const {comms} = this.state;
        const {commsPublic} = this.state;
        const {commsListClass} = this.state;
        const {staff} = this.state;
        const {next} = this.state;
        return (
            <div className="container-fluid">
                <h1>
                    {staff === true ? <Link className='mr-2'
                                            maintainScrollPosition={false}
                                            to={{
                                                pathname: `/site-management/comms/create/`,
                                                state: {fromDashboard: false}
                                            }}><Button variant="outline-dark"
                                                       type="button">Create New Comm</Button>
                    </Link> : ""}
                <Button onClick={this.toggleCommListClass}>List View</Button>
                </h1>
                <br/>
                {staff === true ?
                    <div>
                        {comms.length > 0 ? comms.map((commItem, index) => {
                            return (
                                <CommInline comm={commItem}
                                            elClass={commsListClass}/>
                            )
                        }) : <p>No comms Found</p>
                        }
                    </div>
                    :
                    <div>
                        {comms.length > 0 ? commsPublic.map((commItem, index) => {
                            return (
                                <CommInline comm={commItem}
                                            elClass={commsListClass}/>
                            )
                        }) : <p>No Comms Found</p>
                        }
                    </div>}
                <div className="d-flex flex-column text-center">
                    {next !== null ? <Button
                        variant="outline-dark"
                        onClick={this.loadMoreComms}>Load
                        more</Button> : ''}
                </div>
                <br/>
            </div>
        );
    }
}

export default Comms;