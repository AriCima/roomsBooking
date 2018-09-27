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
    }
  }
 
  componentDidMount(){
    
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


  
  render() {

    console.log("AptCode en el Apt", this.state.apartmentCode)
    
    return (


      <div className="apt-overview">
      
        <div className="paque">

          {this.state.apartment === null ? <p>LOADING !</p> :
          this._renderApartmentInfo()}
      
        </div>

        <div className="rooms-listing">

          <RoomsOverview aptCode={this.state.apartmentCode}/>
          
        </div>

        <div className="add-room-button">

          <div>
            <p>Add Apt Booking</p>
          </div>

          <div>
            <Link to={`/apt_newbooking/${this.state.apartmentCode}`}><AddButton/></Link>
          </div>

          </div>

      </div>

    );
  };
};

