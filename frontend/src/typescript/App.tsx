import * as serviceWorker from './serviceWorker';

import React from 'react';
import { Component } from 'react';

import createReactClass from 'create-react-class';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Editor from './Editor';
import Home from './components/Home/index';
import Navigation from './components/Navigation/index';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <Navigation router={Router} />
                </div>
                    {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/about" component={() => <Home title="About"/>}></Route>
                        <Route path="/users" component={() => <Home title="Users"/>}></Route>
                        <Route path="/codeinthedark" component={Editor}></Route>
                        <Route exact={true} path="/" component={() => <Home title="Home"/>}></Route>
                    </Switch>
            </div>
        );
    }
}