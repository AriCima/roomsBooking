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
      userId: this.props.userEmailId.id,
      apartments: []
    };

    // console.log("USERID en AptOvVIEW: ", this.state.userId)
  }

  
  
  componentDidMount() {
    console.log("el user en AptOverview: ", this.state.userId)
    DataService.getUserApartments(this.state.userId)
    .then(apts => {
    const apartments = apts;
    console.log("apts en aptOverview: ", apts)
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
        <Link to={`/single_apt_overview/${apt.id}`} key={i}>
          <h1>{apt.apartmentName}</h1> 
          <p>{apt.rentalType}</p>
        </Link>
      )
    })
  } 

  render() {
  

    return (
      
      <div>
        <div className="list">
          {this.state.apartments.length === 0? <p>LOADING !</p> : this._renderApartments() }
        </div>

        <div className="add-apartment">
          <p>Add apartment</p>
          <div className="add-room-button">
            <Link to={`/apt_add/${this.state.userId}`}><AddButton/></Link>
          </div>
        </div>

      </div>

    )

  }
}

export default ApartmentsOverview;
