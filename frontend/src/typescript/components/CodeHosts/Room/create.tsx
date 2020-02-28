import React from 'react';
import { Component } from 'react';
import {Redirect, Route} from "react-router-dom";

export default class CodeHostRoomCreate extends Component<{}, {max_contestants: number, time_limit: number, errors: string[] | null, redirect: boolean}>{
    constructor(props: any, context: any) {
        super(props, context);
        document.title = 'Create Room | CodeHost | Django Code In The Dark';
        this.state = {
            max_contestants: 1,
            time_limit: 15,
            errors: null,
            redirect: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var form = event.currentTarget;

        fetch('/api/rooms/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + (localStorage.getItem('token') ? localStorage.getItem('token') : '')
            },
            body: JSON.stringify({max_contestants: this.state.max_contestants, time_limit: this.state.time_limit}),
        })
        .then(json => {
            if(json.status !== 200)
                throw json.json();
            return json.json();
        })
        .then(json => {
            this.setState({ redirect: true})
        })
        .catch((error) => {
            this.setState({errors: error})
        });

    }

    render() {
        return(
            <div>
                {this.state.redirect ? <Redirect  to="/codehost/overview/room" /> : ''}
                <h2>Create Room</h2>
                <div className="row">
                    <div className="col-sm-12">
                        <form className="form" onSubmit={this.handleSubmit}>
                            <input type="hidden" name="uuid" value={localStorage.getItem("token")} />
                            <div className="form-group">
                                <label>
                                    Contestants:
                                    <input type="number" className="form-control" name="max_contestants" min="1" max="100" step="1" value={this.state.max_contestants} />
                                </label>
                            </div>

                            <div className="form-group">
                                <label>
                                    Time limit(in minutes):
                                    <input type="number" className="form-control" name="time_limit" min="5" max="45" step="1" value={this.state.time_limit} />
                                </label>
                            </div>

                            <div className="form-group">
                                <input type="submit" className="btn btn-success" value="Create" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )}
}
