import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import AddButton from '../../Accessories/AddButton';

// SERVICE API
import DataService from '../../services/DataService';

// CSS
import './index.css';
import RoomsOverview from '../../Rooms/RoomsOverview';


export default class Apartment extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      apartment : null,
    }
  }
 
  componentDidMount(){
    DataService.getApartmentInfo(this.props.apartmentCode).then(res => {
      const apt = res.data;
      console.log("Res: ", res)
      this.setState({ apt });
    })
    .catch(function (error) {    
      console.log(error);
    })
  }
  
  render() {

    this.state.apartment === null ? <p>LOADING !</p> : 

    console.log("render del Apartment, props:", this.props)

    return (
      
      <div className="apt-overview">

        <div className="upper-menu">
          <p>this.state.apartmentName</p>
        </div>


        <div className="apt-info">
          <p>this.state.street </p>
        </div>

        <div className="apt-info">
          <p>this.state.houseNr</p> 
        </div>

        <div>
          <p>Apartment Bookings</p>

          <div className="add-room-button">
            <Link to="/apt-bookings"><AddButton/></Link>
          </div>
          
          {/* <ApartmentBookings /> */}
        </div>


        <div>
          <RoomsOverview aptId={this.state.apartment.apartmentCode}/>
        </div>



      </div>

    );
  };
};

