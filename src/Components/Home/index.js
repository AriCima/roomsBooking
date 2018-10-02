import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import AddButton from '../../Components/Accessories/AddButton';

// DATA
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// CSS
import './index.css';



export default class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userId                  : this.props.userEmailId.id,
      apartments              : [],
      userAptContracts        : [],
      currentAptContracts     : [],
      rooms                   : [],
      currentRoomContracts    : [],
    }
    
  };


  componentDidMount() {
    
    DataService.getUserApartments(this.state.userId)
    .then(apts => {
      console.log('apts recibidos en Home', apts)
    const apartments = apts;
    
    this.setState({ apartments });
    }).catch(function (error) {   
    // handle error
    console.log(error);
    })

    DataService.getUserAptContracts(this.state.userId)
    .then(userAptContracts => {
      console.log('userAptContracts en Home', userAptContracts)
      let y = Calculations.getCurrentAptContracts(userAptContracts)
      console.log('Y', y);


    console.log('this.state.currentAptContracts', this.state.currentAptContracts)
    }).catch(function (error) {    
    
    console.log(error);
    })

  };

  
  _renderApartments(){

    return this.state.apartments.map((apt,i) => {
      return (
        
        <Link className="apts-row" to={`/single_apt_overview/${apt.id}`} key={i}>
          <div className="apts-info-block">
            <p>{apt.apartmentName}</p>
          </div> 
          <div className="apts-info-block-b">
            <p>Rented</p>
          </div>
          <div className="apts-info-block-b">
            <p>{'this.state.tenantName'}</p>
          </div>
          <div className="apts-info-block-b">
            <p>{'this.state.check-in'}</p>
          </div>
          <div className="apts-info-block-b">
            <p>{'this.state.check-out'}</p>
          </div>
          <div className="apts-info-block-b">
            <p>{'this.state.rent'}</p>
          </div>
        </Link>

      )
    })
  }; 


  render() {
  

    return (
      <div>
        <div className="apts-list">

          <div className="page-title">
            <h3>My Apartments</h3>
          </div>

          <div className="apts-list-header">
            <ul>
              <li>ID</li>
              <li>Current State</li>
              <li>Tenant Name</li>
              <li>Check-In</li>
              <li>Check-Out</li>
              <li>Rent (€/Mo)</li>
            </ul>          
          </div>
          {this.state.apartments.length === 0? <p>LOADING !</p> : this._renderApartments() }

        <div className="add-apartment">
          <p>Add apartment</p>
          <div className="add-apt-button">
            <Link to={`/apt_add/${this.state.userId}`}><AddButton/></Link>
          </div>
        </div>

      </div>

      </div>
    )

  }
}



