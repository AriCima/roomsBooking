import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import RoomInput from './RoomInput';

// SERVICE API
import DataService from '../services/DataService';

import './index.css';

export default class RoomManagement extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      rooms : []
    }

  }

  componentDidMount(){
    console.log("ComponenDidMount userID:", this.props.userEmailId.id);

    DataService.getUsersRoomsList(this.props.userEmailId.id).then(
      (roomsReceived) => {
        console.log("Rooms received", roomsReceived)

        this.setState({rooms: roomsReceived})

        console.log("Rooms del Manage state", this.state.rooms)

      }
    )  
  }

  _renderRooms(){
      
    return this.state.rooms.map((room,i) => {
        return (

          <Link className="room-row" key={i} to={`/room-admin/${room.roomNumber}`}> 
          
            <div className="info-block">
                <p>Room Nr: {room.roomNumber}</p>
            </div>
            <div className="info-block">
                <p>Room Size: {room.sqm}</p>
            </div>
            <div className="info-block">
                <p>Exterior: {room.exterior}</p>
            </div>
            <div className="info-block">
                <p>Balcony: {room.balcony}</p>
            </div>
            <div className="info-block">
                <p>Private Bathroom: {room.privateBathroom}</p>
            </div>
            <div className="info-block">
                <p>Room Price: {room.price}</p>
            </div>

          </Link>
        )
    })
    } 
  render() {

    const {rooms} = this.state
    console.log('props de RoomManage: ', this.props)
    return (
      
      <div className="rooms-admin">

        <div className="rooms-list">
          {this._renderRooms()}
        </div>

        <div className="room-input">
            <RoomInput userEmailId={this.props.userEmailId}/> 
        </div>
          




      </div>
    );
  }
}

