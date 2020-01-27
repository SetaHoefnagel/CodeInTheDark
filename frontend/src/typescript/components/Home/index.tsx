import React from 'react';
import { Component } from 'react';

export default class Home extends Component<{ title: any }, {}>{
    constructor(props: any, context: any) {
        super(props, context);
        document.title = this.props.title + ' | Django Code In The Dark';
    }

    getApi(){
        return "API REQUEST";
    }

    render() {
        return(
            <div className="row">
                <div className="col-sm-12 col-md-6 offset-md-3">
                    <h2>{ this.props.title }</h2>
                    <p>
                        Code in the dark is a competition on ones knowledge of the web front end (HTML, CSS).
                    </p>
                    <h2>Getting started</h2>
                    <p>Here any event will be hosted for you, but before you can beat your competition some
                    configuration has to be done. </p>
                    <h3>Contestant</h3>
                    <p>
                        As contestant it is very easy to join a cometition. Each competition is hosted by a host,
                        with a room key. This room key gives you access to the competition.
                    </p>
                    <h3>Host</h3>
                    <p>
                        As host you can create and manage your rooms.
                    </p>
                    <h2>Rules</h2>
                    <ul>
                        <li><p>Each contestant receives a bundle of the editor, which includes a screenshot of the page
                            they should implement with HTML/CSS and any additional assets they might need.</p></li>
                        <li><p>No iframes, frameworks, snippets or other assets outside of the ones listed in the
                            instructions are allowed. The site should be built from scratch during the competition.
                        </p></li>
                        <li><p>The contestant should have the editor in full screen mode, and is never allowed to exit
                            out of it or use any measurement tools.</p></li>
                        <li><p>Previews of the results are strictly forbidden until the time is over.</p></li>
                        <li><p>Once the 15 minute timer runs out each contestant presents their result to the
                            audience, who then vote on their favorite to decide the winner.</p></li>
                    </ul>
                </div>
            </div>
        )
    }
}