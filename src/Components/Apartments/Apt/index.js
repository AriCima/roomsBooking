import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

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
      apartment : null,
    }
  }
 
  componentDidMount(){
    //console.log('Los params recibidos en Apt son: ', this.props.aptID)
    DataService.getApartmentInfo(this.props.aptID).then(res => {
      const apt = res;
      //console.log("El res.data en APT es = ", res.data)
      console.log("Res: ", res)
      this.setState({ 
        apartment : res });
      //console.log("apt en APT = ", apt)
      console.log("el state del apt: ", this.state)
    })
    .catch(function (error) {    
      console.log(error);
    })
  }

  _renderApartmentInfo(){
    return (
      <div>
        <div className="upper-menu">
          <p>{this.state.apartment.apartmentName}</p>
        </div>
        <p>APARTMENT ADDRESS</p>
        <div className="apt-info">
          <p>{this.state.apartment.street} {this.state.apartment.houseNr}, {this.state.apartment.floor}ª, {this.state.apartment.door} </p>
        </div>
      </div>
    )
  };
  
  render() {

    
    return (

      <div className="apt-overview">

        <div className="apt-info">
          {this.state.apartment === null ? <p>LOADING !</p> : this._renderApartmentInfo()}
        </div>

        <div className="add-room-button">
          <p>Apartment Bookings</p>
          <Link to="/apt-bookings"><AddButton/></Link>
        </div>
        
        {/* <ApartmentBookings /> */}


        <div>
          {/* <RoomsOverview aptId={this.state.apartment.apartmentCode}/> */}
        </div>



      </div>

    );
  };
};

