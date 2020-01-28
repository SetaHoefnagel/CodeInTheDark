import React from 'react';
import { Component } from 'react';

export default class CodeHostOverview extends Component<{}, {}>{
    constructor(props: any, context: any) {
        super(props, context);
        document.title = 'Overview | CodeHost | Django Code In The Dark';
    }
    render() {
        return(
            <div>
                <h2>Overview - CodeHost</h2>
            </div>
    )}
}
