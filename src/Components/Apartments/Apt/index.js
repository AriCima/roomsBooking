import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

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

        //console.log("Rooms del Manage state", this.state.rooms)

      }
    ); 
    
    DataService.getApartmentBookings(this.state.apartmentCode).then(
      (bookingsReceived) => {
        //console.log("Rooms received", roomsReceived)

        this.setState({aptBookings: bookingsReceived})



      }
    ); 
    
  }

  _renderApartmentInfo(){
    return (
      
      <div className="apt-render-fn"> 

        <div className="apt-info-block">
          <div className="info-block-text">
            <Link to={`/single_apt_overview/${this.state.apartmentCode}`}><h4>{this.state.apartment.apartmentName}</h4></Link>
          </div>  
          <div className="address">
            <p>{this.state.apartment.street} {this.state.apartment.houseNr}, {this.state.apartment.floor}ª, {this.state.apartment.door} </p>
          </div>
        </div>

      </div>
    )
  };

  _renderAptBookings(){
    return this.state.aptBookings.map((bkngs,i) => {
        return (
          <Link className="apt-bookings-row" key={i} to={`/apt_booking_info/${bkngs.id}`}> 
          
            <div className="apt-booking-info-block">
                <p>{bkngs.tenantName}</p>
            </div>
            <div className="apt-booking-info-block">
                <p>{bkngs.tenantSurname}</p>
            </div>
            <div className="apt-booking-info-block">
                <p>{bkngs.checkIn}</p>
            </div>
            <div className="apt-booking-info-block">
                <p>{bkngs.checkOut}</p>
            </div>
            <div className="apt-booking-info-block">
                <p>{bkngs.price}</p>
            </div>

          </Link>
        )
    })
  } 

  _renderRooms(){
    return this.state.rooms.map((room,i) => {
        return (
          <Link className="apt-room-row" key={i} to={`/single_room_overview/${room.id}`}> 
          
            <div className="apt-room-info-block">
                <p>{room.roomNumber}</p>
            </div>
            <div className="apt-room-info-block">
                <p>{room.sqm}</p>
            </div>
            <div className="apt-room-info-block">
                <p>{room.exterior}</p>
            </div>
            <div className="apt-room-info-block">
                <p>{room.balcony}</p>
            </div>
            <div className="apt-room-info-block">
                <p>{room.privateBathroom}</p>
            </div>
            <div className="apt-room-info-block">
                <p>{room.price}</p>
            </div>

          </Link>
        )
    })
  } 
  
  render() {
    
    return (

      <div className="apt-overview">
      
        <div className="paque">

          {this.state.apartment === null ? <p>LOADING !</p> :
          this._renderApartmentInfo()}
      
        </div>

        <div className="apt-bookings-list">
            <div className="apt-bookings-title">
                <p>Apartment Bookings</p>
            </div> 
            <div className="apt-bookings-list-header">

                <ul>
                    <li>Name</li>
                    <li>Surname</li>
                    <li>Check-In</li>
                    <li>Check-Out</li>
                    <li>Preice €/Mo</li>
                </ul>          
            </div>

            <div className="room-bookings-render">
            {this._renderAptBookings()}
            </div>

        </div>

        <div className="apt-add-booking-button">
            <div>
                <p>New Booking</p>
            </div>
            <div>
                <Link to={`/apt_newbooking/${this.state.apartmentCode}`}><AddButton/></Link>
            </div>
        </div>
            


        <div className="apt-rooms-admin">

            <div className="apt-manage-rooms">
            <div className="apt-bookings-title">
                <p>Rooms</p>
            </div> 
            <div className="apt-rooms-list">

              <div className="apt-rooms-list-header">
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

