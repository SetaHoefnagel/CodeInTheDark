import React from 'react';
import { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";

export default class PrivateNavLink extends NavLink<{props: any}>{
    constructor(props: any){
        super(props);
    }

    render() {
        return(
        <div>
            asdf
        </div>
    )}
}
