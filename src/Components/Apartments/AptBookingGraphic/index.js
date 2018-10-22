import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// CSS
import './index.css';

export default class CurrentAptContract extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user                 : this.props.userData,
      apartmentCode        : this.props.aptID,
      aptContracts         : [],
      currentDay           : Calculations.getCurrentMonth()[0],
      currentMonth         : Calculations.getCurrentMonth()[1],
      months               : Calculations.getCurrentMonth()[2],
      daysOfMonth          : [31, 28, 31, 30,
                              31, 30, 31, 31,
                              30, 31, 30, 31],
      
    }
  };
 
  componentDidMount(){

    if (this.state.apartmentCode) {
      this._loadData(this.state.apartmentCode);
    }


  };

  _loadData(aptCode){
    DataService.getApartmentBookings(aptCode)  
    .then(contracts => {
      //Once contracts are here, we get the CURRENT APT CONTRACT
      this.state.aptContracts = contracts

    }).catch(function (error) {    
    console.log(error);
    })
  }

  _renderApartmentInfo(){
    return (
      
      <div className="apt-render-fn"> 

        <p>HERE GOES THE CURRENT BOOKING GRAPHIC</p>
          
      </div>
    )
  };

  _renderAptBookings(){
        <div className="apt-render-fn"> 

            <p>HERE GOES THE CURRENT BOOKING GRAPHIC</p>
            
        </div>

        for( let m = this.state.currentMonth; m <11 ; m++){

        }

  } 

  
  render() {
    
    return (

      <div className="apt-overview">
      
        <div className="paque">

          {this.state.aptContract.length === 0 ? <p>LOADING !</p> :
          this._renderApartmentInfo()}
      
        </div>
      
      </div>

    );
  };
};

