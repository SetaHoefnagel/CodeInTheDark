import React from 'react';
import { Component } from 'react';
import { NavLink } from "react-router-dom";
import {Room, Contestant} from 'models';

type RoomList =  {
    rooms: "loading" | "error" | Room[]
}

async function getAllRooms(): Promise<Room[]> {
    const res = await fetch('/api/rooms/list', {
            headers: { Authorization: 'Token ' + (localStorage.getItem('token') ? localStorage.getItem('token') : '')}
        });
    if(res.status !== 200){
        throw 'status_code ' + res.status;
    }
    return res.json()
}

export default class CodeHostRoom extends Component<{}, RoomList>{
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            rooms: "loading"
        }
        document.title = 'Room | CodeHost | Django Code In The Dark';
    }

    componentDidMount(){
        getAllRooms().then((response: Room[]) => {
            console.log(response[0])
            let roomlist = response;
            for(let i = 0; i < roomlist.length; i++){
                roomlist[i].start_time = roomlist[i].start_time ? new Date(roomlist[i].start_time) : roomlist[i].start_time;
            }
            this.setState({ rooms: roomlist })
        }).catch((response) => { this.setState({ rooms: "error" })});


    }

    render() {
        return(
            <div>
                <h2>Room list - CodeHost</h2>
                <p>These are all the rooms you have created</p>
                <NavLink className="btn btn-success" exact={true} to="/codehost/overview/room/create">Create new Room</NavLink>
                <div className="row">
                    <div className="col-sm-12">
                        {this.state.rooms == "loading" ? <p>Loading...</p> :
                        this.state.rooms == "error" ? <p>Oops, something went wrong loading the list of rooms...</p> :
                        this.state.rooms.map(r => <RoomComponent room={r} />)}
                    </div>
                </div>
            </div>
    )}
}

export type RoomProps = {room: Room}

export class RoomComponent extends Component<RoomProps, {time_left: number, tick_timer: any, completed: boolean}>{
    constructor(props : RoomProps){
        super(props);
        this.state = {
            time_left: (this.props.room.start_time != null ?
            (Math.ceil(this.props.room.time_limit - ((new Date().getTime() - this.props.room.start_time.getTime()) / 1000)) >= 1 ?
            Math.ceil(this.props.room.time_limit - ((new Date().getTime() - this.props.room.start_time.getTime()) / 1000)) : 0) : 0),
            tick_timer: null,
            completed: this.props.room.completed,
        };

        this.tickTimer = this.tickTimer.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    componentDidMount() {
        if(this.props.room.start_time !== null){
            this.setState({ tick_timer: setInterval(this.tickTimer, 1000)});
        }
    }

    tickTimer() {
        if(this.state.time_left !== 0){
            this.setState({ time_left: this.state.time_left - 1 });
        }
        else {
            clearInterval(this.state.tick_timer);
            this.setState({completed: true});
            //TODO: send to server signal of completion, update props
        }
    }

    startTimer(){
        fetch('/api/rooms/start', {
            method: 'POST',
            headers: {
                Authorization: 'Token ' + (localStorage.getItem('token') ? localStorage.getItem('token') : ''),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                room: this.props.room.id,
            }),
        }).then((e) => {
            if (e.status === 200){
                this.setState({
                    tick_timer: setInterval(this.tickTimer, 1000),
                    time_left: Math.ceil(this.props.room.time_limit)
                });
            }
        }).catch((e) => console.log(e));

    }

    public render() {
        return (
            <div className="row">
                <div className="col-sm-12 text-left"><h3>Room {this.props.room.code}</h3></div>
                <div className="col-sm-2">Connected contestants: {this.props.room.contestants.length}/{this.props.room.max_contestants}
                    <ul>
                        {this.props.room.contestants.map(contestant => <li>{contestant.username}</li> )}
                    </ul>
                </div>
                {this.state.completed === true ?
                    <div className="col-sm-3"><button className="btn btn-success" disabled>Completed</button></div> :
                    ((this.state.tick_timer === null) ?
                    <div className="col-sm-3"><button className="btn btn-success" onClick={this.startTimer}>Start</button></div>
                    : <div className="col-sm-3"><button className="btn btn-warning" disabled>Competing</button></div>)}
                {!this.state.completed && this.state.time_left !== 0 ?
                    <div className="col-sm-3">Time left:&nbsp;
                        {this.state.time_left} Seconds</div>
                    : ""}
                <div className="col-sm-3"><button className="btn btn-danger">Delete</button></div>
            </div>
        )
    }

}
