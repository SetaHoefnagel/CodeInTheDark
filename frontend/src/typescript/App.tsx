import React from 'react';
import logo from '../logo.svg';
import { Component } from 'react';
import * as serviceWorker from './serviceWorker';
import Editor from './Editor';
import createReactClass from 'create-react-class';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {
    render() {
        return (
            <div className="App container-fluid">
                <Router>
                    <div className="nav">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{width: '100%'}}>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">Users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/codeinthedark">Code in the dark</Link>
                                </li>
                            </ul>
                        </nav>

                    {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/about"><Home title="About"/></Route>
                            <Route path="/users"><Home title="Users"/></Route>
                            <Route path="/codeinthedark">
                                <Editor />
                            </Route>
                            <Route path="/"><Home title="Home"/></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

class Home extends Component<{ title: any }, {}>{
    constructor(props: any, context: any) {
        super(props, context);
    }

    getApi(){
        return "API REQUEST";
    }

    render() {
        return(
            <div className="container-fluid">
                <h2>{this.props.title}</h2>
                <div className="row">
                    <div className="col-sm-12">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" style={{ width: '100%', textAlign: 'center' as 'center' }} />
                        </header>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                            <a style={{ width: '100%', textAlign: 'center' as 'center' }}
                                href="/" onClick={ (item) => { item.preventDefault() }} >
                                {this.getApi}
                            </a>
                    </div>
                </div>
            </div>
        )
    }
}