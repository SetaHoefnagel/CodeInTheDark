import React from 'react';
import { Component } from 'react';

type PopUpImageProps = {
    src: string,
    className?: string
}

type PopUpImageState = {
    fullscreen: boolean,
}


export class PopUpImage extends Component<PopUpImageProps, {fullscreen: boolean}>{

    constructor(props: PopUpImageProps) {
        super(props);

        this.state = {
            fullscreen: false
        }

        this.toggleFullScreen = this.toggleFullScreen.bind(this);
    }

    toggleFullScreen(event) {
        this.setState({fullscreen: !this.state.fullscreen})
    }

    componentDidMount(){

    }

    render() {
        return(<div className={this.state.fullscreen ? 'pop-up-container fullscreen' : 'pop-up-container '}>
                <span className="close" onClick={this.toggleFullScreen}>X</span>
                <img className={this.props.className} src={this.props.src} onClick={this.toggleFullScreen}/>
            </div>
    )}
}
