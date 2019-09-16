import React, {Component} from 'react'
import 'whatwg-fetch'
// import cookie from 'react-cookies'
// import {Link} from 'react-router-dom'
// import {Redirect} from "react-router-dom";
// import Comms from '../comm/Comms';

class MyBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: null,
        };
    }

    loadCommsView() {
        this.setState({
            CommsView: true
        });
    }

    render() {
        const {blocks} = this.state;
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
            <div>
                <h2>Main Page</h2>
            </div>
        )
    }
}

export default MyBlock