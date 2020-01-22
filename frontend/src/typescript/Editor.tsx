import React from 'react';
import { Component } from 'react';
import AceEditor from "react-ace";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import 'brace/mode/html'
import 'brace/theme/github'

export default class App extends Component<{}, { roomCode: any, room: any }> {
    constructor(props){
        super(props);
        this.state = {
            roomCode: '',
            room: false
        }
    }


    onChange(event){
        console.log(event);
        localStorage.setItem("code", event);
    }

    render() {
        return (
            <div>
                <Router>

                    {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="select-room">
                            <h2>Enter the room code</h2>
                            <div className="form-contrl">
                                <input type="text" className="form-control" onChange={ (event) => { this.setState({roomCode: event.target.value})} } />
                            </div>
                            <div className="form-contrl">
                                <button className="btn btn-success">Verder</button>
                            </div>
                        </Route>
                        <Route path="/">
                            {!this.state.room ? <Redirect to="/codeinthedark/select-room" /> :
                                <div>
                                    <div className="background"></div>
                                    <canvas className="canvas-overlay"></canvas>
                                    <AceEditor
                                        mode="html"
                                        theme="github"
                                        onChange={this.onChange}
                                        name="editor"
                                        style={{ width: '100%' }}
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                    <div className="streak-container">
                                    <div className="current">Combo</div>
                                    <div className="counter">0</div>
                                    <div className="bar"></div>
                                    <div className="exclamations"></div>
                                    </div>
                                    <div className="reference-screenshot-container">
                                        <span>Reference</span>
                                        <div className="reference-screenshot" style={{ backgroundImage: "url(assets/page.png)" }}></div>
                                    </div>

                                    <div className="name-tag">
                                        Unnamed
                                    </div>

                                    <div className="power-mode-indicator">
                                        <h1>POWER MODE!</h1>
                                    </div>

                                    <div className="instructions-container">
                                        <iframe className="instructions" src="assets/instructions.html"></iframe>
                                    </div>

                                    <div className="button-bar">
                                        <button className="finish-button">Finish</button>
                                        <button className="instructions-button">Instructions</button>
                                    </div>
                                </div>
                            }
                        </Route>
                    </Switch>
                </Router>

            </div>
        )
    }
}
