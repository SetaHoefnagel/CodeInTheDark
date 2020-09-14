import * as serviceWorker from './serviceWorker';

import React from 'react';
import { Component } from 'react';

// import createReactClass from 'create-react-class';

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
import CodeHostRoom from './components/CodeHosts/Room/index';
import CodeHostRoomCreate from './components/CodeHosts/Room/create';
import CodeHostOverview from './components/CodeHosts/overview';
import CodeInTheDark from './components/CodeInTheDark/index';
import Users from './components/Users/index';
import { Layout } from './components/Layouts/header-navigation';
import { CodeHostLayout } from './components/Layouts/room-navigation';

export default class App extends Component {

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/about" component={() => <About />} />
                    <Route path="/codehost/overview/room/create(/?)" strict={true} component={() => <CodeHostLayout><CodeHostRoomCreate /></CodeHostLayout>} />
                    <Route path="/codehost/overview/room(/?)" strict={true} component={() => <CodeHostLayout><CodeHostRoom /></CodeHostLayout>} />
                    <Route path="/codehost/overview(/?)" strict={true} component={() => <CodeHostLayout><CodeHostOverview /></CodeHostLayout>} />
                    <Route path={'/codehost(/?)'} strict={true} component={() => <CodeHost />} />
                    <Route path="/users" component={() => <Users />} />
                    <Route path="/codeinthedark" component={() => <CodeInTheDark />} />
                    {/* <Route path="/codeinthedark" component={Editor}></Route> */}
                    <Route exact={true} path="/" component={() => <Home title="Home"/>} / >
                </Switch>
            </Layout>
        );
    }
}
