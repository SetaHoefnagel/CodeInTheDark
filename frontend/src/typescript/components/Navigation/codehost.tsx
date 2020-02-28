import React from 'react';
import { Component } from 'react';
import PrivateNavLink from './PrivateNavLink';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

export default class CodeHostNavigation extends Component<{}, {}>{
    render() {
        return(
            <nav className="nav flex-column text-left">
                    <h3>Room</h3>
                    <NavLink className="nav-item ml-3" exact={true} to="/codehost/overview/room">Room overview</NavLink>
                    <NavLink className="nav-item ml-3" exact={true} to="/codehost/overview/room/create">Create room</NavLink>
            </nav>
    )}
}
