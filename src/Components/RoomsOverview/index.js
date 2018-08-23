import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import RoomInput from '../RoomsOverview/RoomInput';
import RoomState from '../RoomsOverview/RoomState';
import AddButton from '../Accessories/AddButton';

// SERVICE API
import DataService from '../services/DataService';

import './index.css';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

export default class RoomsOverview extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      rooms : [],
      occupation: {}
    }

  }

  componentDidMount(){
    console.log("ComponenDidMount roomsOverview userID:", this.props.userEmailId.id);

    DataService.getUserRoomsList(this.props.userEmailId.id).then(
      (roomsReceived) => {
        console.log("Rooms received", roomsReceived)

        this.setState({rooms: roomsReceived})

        console.log("Rooms del Manage state", this.state.rooms)

      }
    );  

    DataService.getRoomsOccupation(this.props.userEmailId.id).then(
      
      (roomsOccupationReceived) => {

        console.log("Rooms Occupation received", roomsOccupationReceived)

        this.setState({occupation: roomsOccupationReceived})

        console.log("Rooms del Manage state", this.state.occupation)

      }
    );  
  }




  _renderRooms(){
      
    return this.state.rooms.map((room,i) => {
        return (

          <Link className="room-row" key={i} to={`/room-admin/${room.roomNumber}`}> 
          
            <div className="info-block">
                <p>{room.roomNumber}</p>
            </div>
            <div className="info-block">
                <p>{room.sqm}</p>
            </div>
            <div className="info-block">
                <p>{room.exterior}</p>
            </div>
            <div className="info-block">
                <p>{room.balcony}</p>
            </div>
            <div className="info-block">
                <p>{room.privateBathroom}</p>
            </div>
            <div className="info-block">
                <p>{room.price}</p>
            </div>

          </Link>
        )
    })
  } 
  
  render() {

    const {rooms} = this.state
    console.log('props del Overview: ', this.props)

    return (
      
      <div className="rooms-admin">

        <div className="manage-bookings">

          <div className="room-input">
            <RoomState userEmailId={this.props.userEmailId}/> 

            <p>{this.state.occupation.bookingCode}</p>
          </div>
          <div className="add-room-button">
            <Link to="/bookings"><AddButton/></Link>
          </div>
        </div>

        <div className="manage-rooms">

          <div className="rooms-list">
            <div className="rooms-list-header">
              <ul>
                <li>Room Nr</li>
                <li>Size (sqm)</li>
                <li>Exterior</li>
                <li>Balcony</li>
                <li>Private Bathroom</li>
                <li>Price (€/Mo)</li>
              </ul>          
            </div>
            {this._renderRooms()}
          </div>

          <div className="room-input">
            <RoomInput userEmailId={this.props.userEmailId}/> 
          </div>
        </div>

      </div>
    );
  }
}

