import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import AddButton from '../Accessories/AddButton';

import './index.css';

class ApartmentBookings extends Component {
  constructor(props){
    super(props)

    this.state = {
      apartments: null,
    }
  }

  
  componentDidMount() {
    console.log("ComponentDidMount START")
    DataService.getApartmentBooking(apartmentCode)
    .then(res => {
    const apartments = res.data.results;
    this.setState({ apartments });
    })
    .catch(function (error) {    // ataja el error: no rompe la app
    // handle error
    console.log(error);
    })
  };

  _renderAptBookings(){
    return this.state.apartments.map((apts,i) => {
      return (
        <Link to={`/apts/${apts.id}`} key={i}>
          <h1>{apts.title}</h1> 
          <p>{apts.overview}</p>
        </Link>
      )
    })
  }; 

  render() {
  
    console.log("Nro de Apts: ", this.state.apartments.length);

    return (
      
      <div>
        <div className="list">
          {this.state.apartments.length === 0? <p>LOADING !</p> : this._renderAptBookings() }
        </div>

        <div>
            <p>Add apartment</p>
            <div className="add-room-button">
              <Link to="/bookings"><AddButton/></Link>
            </div>
        </div>
      </div>

    )

  }
}

export default ApartmentBookings;