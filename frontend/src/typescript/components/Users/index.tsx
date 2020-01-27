import React from 'react';
import { Component } from 'react';

export default class User extends Component<{}, {}>{
    constructor(props: any, context: any) {
        super(props, context);
        document.title = 'Users | Django Code In The Dark';
    }
    render() {
        return(
            <div>
                <h2>Users</h2>
            </div>
    )}
}
