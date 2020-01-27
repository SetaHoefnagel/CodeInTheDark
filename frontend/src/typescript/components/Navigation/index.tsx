import logo from '../../../images/codeinthedark_logo.png';

import React from 'react';
import { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

export default class Home extends Component< {}, {}>{
    constructor(props: any, context: any){
        super(props, context)
    }

    public render() {
        return(
            <header className="App-header container-fluid">
                <div className="row">
                    <div className="col-sm-12 bg-dark">
                        <div className="nav">
                            <nav className="navbar navbar-expand-lg navbar-dark" style={{width: '100%'}}>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact={true} to="/">
                                            <img src={'/static/' + logo} className="App-logo" alt="logo" style={{ width: '128px', height: 'auto', textAlign: 'center' as 'center' }} />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact={true} to="/">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/about">About</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/users">Users</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/codehost">CodeHost</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/codeinthedark">Code in the dark</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}