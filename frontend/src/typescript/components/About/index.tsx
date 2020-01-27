import React from 'react';
import { Component } from 'react';

export default class Home extends Component<{}, {}>{
    constructor(props: any, context: any) {
        super(props, context);
        document.title = 'About | Django Code In The Dark';
    }
    render() {
        return(
            <div>
                <h2>About</h2>
            </div>
    )}
}
