import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// COMPONENTS
import AddButton from '../../Accessories/AddButton';
import RoomBookingGraphic from'../RoomBookingGraphic';

// MATERIAL UI
import TextField from '@material-ui/core/TextField';


// SERVICE API
import DataService from '../../services/DataService';

//CSS
import './index.css';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    inputStyle: {
      color: 'rgb(237, 0, 117)',
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing.unit,
      background: 'rgb(237, 0, 117)',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

export default class Room extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      roomCode          : this.props.roomID,
      apartmentCode     : '',
      apartmentName     : '',
      roomNumber        : '',
      sqm               : '',
      exterior          : '',
      privateBathroom   : '',
      balcony           : '',
      price             : '',
      roomBookings      : [],
    }
  }

  componentDidMount(){
    
    DataService.getRoomInfo(this.state.roomCode).then(
      (roomsReceived) => {

        this.setState({
            apartmentCode   : roomsReceived.apartmentCode,
            apartmentName   : roomsReceived.apartmentName,
            roomNumber      : roomsReceived.roomNumber,
            sqm             : roomsReceived.sqm,
            exterior        : roomsReceived.exterior,
            privateBathroom : roomsReceived.privateBathroom,
            balcony         : roomsReceived.balcony,
            price           : roomsReceived.price,
        })

      });  
    DataService.getRoomBookings(this.state.roomCode)
    .then((bookingsReceived) => {
        this.setState({roomBookings: bookingsReceived})
    })
    .catch(function (error) {    
      console.log(error);
    })
  }

  _renderRoomsBookings(){
    return this.state.roomBookings.map((bkngs,i) => {
        return (
          <Link className="standard-list-row" key={i} to={`/room_booking_review/${bkngs.id}`}> 
          
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
                <p>{bkngs.rentPrice}</p>
            </div>

          </Link>
        )
    })
  } 
  
  render() {

    return (
        <div className="Room">

           
            <div className="room-pageInfo">
                <h4>{this.state.apartmentName}<span>, Room Nr: </span>{this.state.roomNumber}</h4>
            </div>
              

            <div className="booking-graphic">
              <RoomBookingGraphic roomID={this.props.roomID}/>
            </div>

            <div className="room-form-container">

                <div className="standard-list">

                    <div className="standard-list-title">
                        <p>Room Bookings</p>
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
                    {this._renderRoomsBookings()}
                    </div>

                </div>

                <div className="add-button-left">
                    <div id="add-button">
                        <div>
                            <p>New Booking</p>
                        </div>
                        <div>
                            <Link to={`/room_newbooking/${this.state.roomCode}`}><AddButton/></Link>
                        </div>
                    </div>
                </div>
            
            </div>         
           


             <div className="room-info-container">
                <div className="standard-list-title">
                    <p>Room info</p>
                </div> 
            
                <form   className="form-width" noValidate autoComplete="off" onSubmit={this.onPayment}>

                    <div id="room-input-area">

                        <div id="input-fields">
                            <TextField
                                disabled
                                label="Room Nr"
                                id="filled-disabled"
                                margin="normal"
                                variant="filled"
                                value={this.state.roomNumber}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                disabled
                                id="with-placeholder"
                                label="Square mts"
                                placeholder="Nombre cliente"
                                margin="normal"
                                value={this.state.sqm}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                disabled
                                id="with-placeholder"
                                label="Exterior"
                                margin="normal"
                                value={this.state.exterior}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                disabled
                                id="with-placeholder"
                                label="Private Bathroom"
                                margin="normal"
                                value={this.state.privateBathroom}
                            />
                        </div>
                        <div id="input-fields-select">
                            <TextField
                                disabled
                                label="Balcony"
                                value={this.state.balcony}
                            />
                        </div>
                        
                    </div>
                </form>
            </div>
            
        </div>
    );
  }
}

