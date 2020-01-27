import React from 'react';
import { Component } from 'react';

export default class CodeInTheDark extends Component<{}, {}>{
    constructor(props: any, context: any) {
        super(props, context);
        document.title = 'CodeInTheDark | Django Code In The Dark';
    }
    render() {
        return(
            <div>
                <h2>CodeInTheDark</h2>
            </div>
    )}
}
