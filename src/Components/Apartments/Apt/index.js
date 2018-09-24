import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// COMPONENTS
import AptBookings from '../AptBookings';
import AddButton from '../../Accessories/AddButton';

// SERVICE API
import DataService from '../../services/DataService';

// CSS
import './index.css';

export default class Apartment extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      apartmentCode : this.props.aptID,
      apartment     : null,
      aptBookings   : [],
    }
  }
 
  componentDidMount(){
    //console.log('Los params recibidos en Apt son: ', this.props.aptID)
    DataService.getApartmentInfo(this.props.aptID)
    .then(res => {
      const apt = res;
      console.log("Res: ", res)
      this.setState({ 
        apartment : res 
      });
    })
    .catch(function (error) {    
      console.log(error);
    })

    DataService.getApartmentBookings(this.props.aptID).then(res => {
      // const apt = res;
      this.setState({ 
        aptBookings : res 
      });
      // Calculations.getCurrentContract(bookings)
    })
    .catch(function (error) {    
      console.log(error);
    })


    

  }

  _renderApartmentInfo(){
    return (
      
      <div className="bookings-list"> 
        <div className="apt-info-block">
          <h4>{this.state.apartment.apartmentName}</h4>
          <h3>Property Overview</h3>
        </div>
        <div className="apt-info-block">
          <p>{this.state.apartment.street} {this.state.apartment.houseNr}, {this.state.apartment.floor}ª, {this.state.apartment.door} </p>
        </div>
        <div className="apt-info-block">
          <p>{this.state.aptBookings.tenantName} {this.state.aptBookings.tenantSurname}</p>
        </div>
      </div>
    )
  };

  _renderApartmentBookings(){
    return this.state.aptBookings.map((booking,i) => {
      return (

        <Link className="bookings-row" key={i} to={`/boocking_code/${booking.bookingCode}`}> 
        
          <div className="info-block">
            <p>{booking.bookingCode}</p>
          </div>
          <div className="info-block">
            <p>{booking.tenantName}</p>
          </div>
          <div className="info-block">
            <p>{booking.tenantSurname}</p>
          </div>
          <div className="info-block">
            <p>{booking.startDay}</p>
          </div>
          <div className="info-block">
            <p>{booking.endDay}</p>
          </div>
          <div className="info-block">
            <p>{booking.rentPrice}</p>
          </div>

        </Link>
      )
  })
  }
  
  render() {

    
    return (


      <div className="apt-overview">
      
        <div className="apartment-info">

          {this.state.apartment === null ? <p>LOADING !</p> :
          this._renderApartmentInfo()}
      
        </div>

        <div className="add-rooms">
          
          <p>Add rooms if you will rent them separately</p>
            
          <div className="add-room-button">
            <Link to={`/apt_adRoom/${this.state.apartmentCode}`}><AddButton/></Link>
          </div>

        </div>
        

       <div className="bookings-list">
          <div className="bookings-list-header">
            <ul>
              <li>Code</li>
              <li>Name</li>
              <li>Surname</li>
              <li>From</li>
              <li>To</li>
              <li>Price (€/Mo)</li>
              <li>Deposit (€)</li>
            </ul>          
          </div>

          {this.state.apartment === null ? <p>LOADING !</p> :
          this._renderApartmentBookings()}
          

          <div className="add-booking-button">
            <Link to={`/apt_newbooking/${this.state.apartmentCode}`}><AddButton/></Link>
          </div>

        </div>

      </div>

    );
  };
};

