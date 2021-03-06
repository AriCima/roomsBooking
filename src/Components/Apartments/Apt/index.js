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

        this.setState({rooms: roomsReceived})


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
      <div className="address">
        <h4>{this.state.apartment.apartmentName}</h4>
      </div>
    )
  };

  _renderAptBookings(){
    return this.state.aptBookings.map((bkngs,i) => {
        return (
          <Link className="standard-list-row" key={i} to={`/apt_booking_review/${bkngs.id}`}> 
          
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

  _renderRoomsGraphic(){
    //console.log('this.state.rooms = ', this.state.rooms)
    return this.state.rooms.map((room,i) => {
      return (
        <Link to={`/single_room_overview/${room.id}`} className="room-line">
          <div className="room-Nr">
            <div>
              <p>Room Nr: </p>
            </div>
            <div>
              <p><span>{room.roomNumber}</span></p>
            </div>
          </div>
          <div className="time-line">
            <RoomBookingGraphic kei={i} roomID={room.id} className="lines"/>
          </div>
        </Link>
      )
  })
  }
  
  render() {

    return (

      <div className="apt-overview">

      {this.state.apartment === null ? <p>LOADING !</p> :
        this._renderApartmentInfo()
      }

      <div className="standard-add-button">
        <div id="button-info">
          <p>Add utility</p>
          <Link to={`/add_utility/${this.state.apartmentCode}`}><AddButton/></Link>
        </div>
      </div>
      
        {this.state.aptBookings.length === 0 ? 
        
          <div>
            {this._renderRoomsGraphic()}
          </div>
          
          :
          
          <div className="paque">
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

