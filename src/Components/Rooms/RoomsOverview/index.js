import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import RoomInput from '../RoomInput';

// MATERIAL UI
import AddButton from '../../Accessories/AddButton';


// SERVICE API
import DataService from '../../services/DataService';


import './index.css';
import OccupationGraphic from '../RoomBookings/OccupationGraphic';


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
      apartmentCode: this.props.aptCode,
      rooms : []
    }
  }

  componentDidMount(){
    console.log("cDIDMount TRIGGERED")
    DataService.getApartmentRooms(this.state.apartmentCode).then(
      (roomsReceived) => {
        console.log("Rooms received", roomsReceived)

        this.setState({rooms: roomsReceived})

        console.log("Rooms del Manage state", this.state.rooms)

      }
    );  
  }

  _renderRooms(){
      console.log("_renderRooms TRIGGERED")
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

    console.log("OccupationPercent: ", this.state.occupationPercent)

    return (
      
      <div className="rooms-admin">

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

            <div className="add-room-button">
              <div>
                <p>Add rooms</p>
              </div>
              <div>
                <Link to={`/apt_addRoom/${this.state.apartmentCode}`}><AddButton/></Link>
              </div>
          </div>
        

          </div>

          
        </div>

      </div>
    );
  }
}

