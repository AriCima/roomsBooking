import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import AddButton from '../../Accessories/AddButton';

// API
import DataService from '../../services/DataService'

import './index.css';

class ApartmentsOverview extends Component {
  constructor(props){
    super(props)

    this.state = {
      userId: this.props.user.userId,
      apartments: []
    };
  }

  
  componentDidMount() {
    console.log("ComponentDidMount START")
    DataService.getUserApartments(this.state.userId)
    .then(res => {
    const apartments = res.data.results;
    this.setState({ apartments });
    })
    .catch(function (error) {    // ataja el error: no rompe la app
    // handle error
    console.log(error);
    })
  };

  _renderApartments(){
    return this.state.apartments.map((apt,i) => {
      return (
        <Link to={`/apt_overview/${apt.id}`} key={i}>
          <h1>{apt.title}</h1> 
          <p>{apt.overview}</p>
        </Link>
      )
    })
  } 

  render() {
  
      
    console.log("Nro de Apts: ", this.state.apartments.length)

    return (
      
      <div>
        <div className="list">
          {this.state.apartments.length === 0? <p>LOADING !</p> : this._renderApartments() }
        </div>

        <div className="add-apartment">
          <p>Add apartment</p>
          <div className="add-room-button">
            <Link to="/bookings"><AddButton/></Link>
          </div>
        </div>

      </div>

    )

  }
}

export default ApartmentsOverview;
