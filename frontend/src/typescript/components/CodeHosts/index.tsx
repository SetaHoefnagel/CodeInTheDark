import React from 'react';
import { Component } from 'react';
import {Redirect, Route} from "react-router-dom";

type CodeState = {
    username: string,
    password: string,
    password_confirm: string,
    email: string,
    token: string,
    errors: string[],
    page: "login" | "registration"
}

export default class CodeHost extends Component<{}, CodeState>{
    constructor(props: any, context: any) {
        super(props, context);
        document.title = 'Host | Django Code In The Dark';
        this.state = {
            username: "",
            password: "",
            password_confirm: "",
            email: "",
            token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            errors: [],
            page: "login"
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({...this.state, [name]: value});
    }

    login(event) {
        event.preventDefault();
        fetch('/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
        })
        .then(json => json.json())
        .then(json => {
            localStorage.setItem("token", json.token)
            localStorage.setItem("token_refresh", json.refresh)
            this.setState({token: json.token });
        })
        .catch((error) => {
            this.setState({errors: error})
        });
    }

    register(event){
        event.preventDefault();

    }

    isLoggedIn(){
        return localStorage.getItem("token") ? true : false
    }

    render() {
        return(
            <div>
                {this.isLoggedIn() ? <Redirect  to="/codehost/overview" /> : ''}
                <h2>Host</h2>
                {this.state.page == "login" ?
                    <form className="form" onSubmit={this.login}>
                        <div className="form-group">
                            <label>Username:
                                <input type="text" placeholder="username" className="form-control" onChange={this.handleInputChange} name="username" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Password:
                                <input type="password" placeholder="*****" className="form-control" onChange={this.handleInputChange} name="password" />
                            </label>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-success" value="Login" />

                        </div>
                        <a href="#" onClick={(e) => {e.preventDefault(); this.setState({ page: "registration" })} }>
                        Create new account</a>
                    </form>
                : this.state.page == "registration" ?
                    <form className="form" onSubmit={this.register}>
                        <div className="form-group">
                            <label>Username:
                                <input type="text" placeholder="username" className="form-control"
                                onChange={this.handleInputChange} name="username" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Password:
                                <input type="password" placeholder="*****" className="form-control"
                                onChange={this.handleInputChange} name="password" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Confirm password:
                                <input type="password" placeholder="*****" className="form-control"
                                onChange={this.handleInputChange} name="password_confirm" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>email:
                                <input type="email" placeholder="email" className="form-control"
                                onChange={this.handleInputChange} name="email" />
                            </label>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-success" value="Register" />

                        </div>
                    </form>
                :
                <div className="alert alert-danger"><p>Something went wrong, you're not suppose to see this.</p></div>
                }
            </div>
    )}
}
