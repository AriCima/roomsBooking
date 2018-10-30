import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// MATERIAL UI
import AddButton from '../../Accessories/AddButton'

// SERVICE API
import DataService from '../../services/DataService';

// Components
import AptBookingGraphic from '../AptBookingGraphic';
import RoomBookingGraphic from '../../Rooms/RoomBookingGraphic';

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
    
    DataService.getApartmentBookings(this.state.apartmentCode)
    .then((bookingsReceived) => {
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
          <Link className="standard-list-row" key={i} to={`/apt_booking_info/${bkngs.id}`}> 
          
            <div className="standard-list-info-block">
                <p>{bkngs.tenantName}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{bkngs.tenantSurname}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{bkngs.checkIn}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{bkngs.checkOut}</p>
            </div>
            <div className="standard-list-info-block-price">
                <p>{bkngs.price}</p>
            </div>

          </Link>
        )
    })
  } 

  _renderRooms(){
    return this.state.rooms.map((room,i) => {
        return (
          <Link className="standard-list-row" key={i} to={`/single_room_overview/${room.id}`}> 
          
            <div className="standard-list-info-block">
                <p>{room.roomNumber}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{room.sqm}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{room.exterior}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{room.balcony}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{room.privateBathroom}</p>
            </div>
            <div className="standard-list-info-block-price">
                <p>{room.price}</p>
            </div>

          </Link>
        )
    })
  } 
  
  render() {

    return (

      <div className="apt-overview">
      
        {this.state.aptBookings.length === 0 ? <p>This apartment has rooms rentals only</p> :
          <div>
            <div className="paque">

              {this.state.apartment === null ? <p>LOADING !</p> :
              this._renderApartmentInfo()}

            </div>

            <div className="booking-graphic">
              <AptBookingGraphic aptID={this.state.apartmentCode}/>
            </div>
          
            <div className="standard-list">
              <div className="standard-list-title">
                  <p>Apartment Bookings</p>
              </div> 
              <div className="standard-list-header">

                  <ul>
                      <li><p>Name</p></li>
                      <li><p>Surname</p></li>
                      <li><p>Check-In</p></li>
                      <li><p>Check-Out</p></li>
                      <li><p>Rent €/Mo</p></li>
                  </ul>          
              </div>

              <div className="standard-list-render">
              {this.state.aptBookings.length === 0 ?
                <div id="empty-list">
                  <p>This apartment is not rented as a unit</p>
                </div> :
                  this._renderAptBookings()}
              </div>

            </div>
          </div>
        }

        <div className="standard-add-button">
            <div id="button-info">
                <p>New Booking</p>
                <Link to={`/apt_newbooking/${this.state.apartmentCode}`}><AddButton/></Link>
            </div>
        </div>
            


         {/* <div className="rooms-graphic">
      
          {this.state.aptBookings.length === 0 ? <p>This apartment has rooms rentals only</p> :
           

              <div className="booking-graphic">
                <RoomsBookingGraphic aptID={this.state.apartmentCode}/>
              </div>
          }

        </div> */}
        <div className="apt-rooms-admin">
         
          {this.state.rooms.length === 0 ? <p>No rooms rentals for this apartment</p> :
            <div className="apt-manage-rooms">
              <div className="standard-list-title">
                  <p>Rooms</p>
              </div> 

              <div className="standard-list">

                <div className="standard-list-header">
                  <ul>
                    <li><p>Room Nr</p></li>
                    <li><p>Size (sqm)</p></li>
                    <li><p>Exterior</p></li>
                    <li><p>Balcony</p></li>
                    <li><p>Private Bathroom</p></li>
                    <li><p>Price (€/Mo)</p></li>
                  </ul>          
                </div>
                
                <div className="standard-list-render">
                  {this.state.rooms.length === 0 ? 
                    <div id="empty-list">
                      <p>This apartment has no rooms listed</p>
                    </div> :
                  this._renderRooms()}
                </div>
              
              </div>
            </div>
          }

          <div className="standard-add-button">
            <div id="button-info">
              <p>New Room</p>
              <Link to={`/apt_addRoom/${this.state.apartmentCode}`}><AddButton/></Link>
            </div>
          </div>
        </div>

      </div>

    );
  };
};

