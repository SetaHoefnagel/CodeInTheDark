import React from 'react';
import { Component } from 'react';

export default class CodeHost extends Component<{}, {}>{
    constructor(props: any, context: any) {
        super(props, context);
        document.title = 'Host | Django Code In The Dark';
    }
    render() {
        return(
            <div>
                <h2>Host</h2>
            </div>
    )}
}
