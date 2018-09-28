import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// COMPONENTS
import RoomsOverview from '../../Rooms/RoomsOverview';

// MATERIAL UI
import AddButton from '../../Accessories/AddButton'

// SERVICE API
import DataService from '../../services/DataService';

// CSS
import './index.css';

export default class Apartment extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user          : this.props.userData,
      apartmentCode : this.props.aptID,
      apartment     : null,
      aptBookings   : [],
      rooms         : [],
    }
  }
 
  componentDidMount(){
    
    DataService.getApartmentInfo(this.props.aptID)
    .then(res => {
      const apt = res;
      //console.log("Res: ", res)
      this.setState({ 
        apartment : res 
      });
    })
    .catch(function (error) {    
      console.log(error);
    })

    DataService.getApartmentRooms(this.state.apartmentCode).then(
      (roomsReceived) => {
        //console.log("Rooms received", roomsReceived)

        this.setState({rooms: roomsReceived})

        console.log("Rooms del Manage state", this.state.rooms)

      }
    );  
    
  }

  _renderApartmentInfo(){
    return (
      
      <div className="apt-render-fn"> 

        <div className="apt-info-block">
          <div className="info-block-text">
            <h4>{this.state.apartment.apartmentName}</h4>
          </div>  
          <div className="address">
            <p>{this.state.apartment.street} {this.state.apartment.houseNr}, {this.state.apartment.floor}ª, {this.state.apartment.door} </p>
          </div>
        </div>
        <div className="apt-info-block">
          <p>{this.state.aptBookings.tenantName} {this.state.aptBookings.tenantSurname}</p>
        </div>

      </div>
    )
  };

  _renderRooms(){
    return this.state.rooms.map((room,i) => {
        return (
          <Link className="room-row" key={i} to={`/single_room_overview/${room.id}`}> 
          
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

    console.log("AptCode en el Apt", this.state.apartmentCode)
    
    return (


      <div className="apt-overview">
      
        <div className="paque">

          {this.state.apartment === null ? <p>LOADING !</p> :
          this._renderApartmentInfo()}
      
        </div>

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
              
              <div className="rooms-render">
                {this._renderRooms()}
              </div>
              
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
      
      </div>

    );
  };
};

