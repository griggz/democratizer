import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';

import Comms from './comm/Comms';
import CommDetail from './comm/CommDetail';
import CommCreate from './comm/CommCreate';

import ScrapeDetail from './scrape/ScrapeDetail';
import ScrapeCreate from './scrape/ScrapeCreate'

import Landing from './landing/Landing'

import MyBlock from './myblock/MyBlock'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/site-management/' component={MyBlock}/>
                    <Route exact path='/site-management/comms/create' component={CommCreate}/>
                    <Route exact path='/site-management/comms/:slug/edit' component={CommCreate}/>
                    <Route exact path='/site-management/comms/' component={Comms}/>
                    <Route exact path='/site-management/comms/:slug' component={CommDetail}/>
                    <Route exact path='/scrape/' component={ScrapeCreate}/>
                    <Route exact path='/scrape/results/:slug' component={ScrapeDetail}/>
                    <Route exact path='' component={Landing}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
