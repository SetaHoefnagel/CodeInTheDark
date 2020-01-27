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
import About from './components/About/index';
import CodeHost from './components/CodeHosts/index';
import CodeInTheDark from './components/CodeInTheDark/index';
import Users from './components/Users/index';
import { Layout } from './components/Layout';

export default class App extends Component {
    render() {
        return (
            <Layout>
                <Route path="/about" component={() => <About />}></Route>
                <Route path="/codehost" component={() => <CodeHost />}></Route>
                <Route path="/users" component={() => <Users />}></Route>
                <Route path="/codeinthedark" component={() => <CodeInTheDark />}></Route>
                {/* <Route path="/codeinthedark" component={Editor}></Route> */}
                <Route exact={true} path="/" component={() => <Home title="Home"/>}></Route>
            </Layout>
        );
    }
}