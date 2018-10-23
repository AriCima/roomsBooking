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
      aptBookings          : [],
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
      this.state.aptBookings = contracts

      this._generateCalendar(contracts)


    }).catch(function (error) {    
    console.log(error);
    })
  }

  _generateCalendar(x){
    console.log('x en el generate calendar: ', x)

    //https://stackoverflow.com/questions/4345045/javascript-loop-between-date-ranges

    var bookedDays = [];
    for (let i = 0; i < x.length; i++ ){
      for (var d = new Date(x[i].checkIn); d <= new Date(x[i].checkOut); d.setDate(d.getDate() + 1)) {

        bookedDays.push(new Date(d));

      }
    }
    console.log('bookedDays', bookedDays)
    return bookedDays
  }

  _renderAptBookings(){
    <div className="apt-render-fn"> 

      <p>HERE GOES THE CURRENT BOOKING GRAPHIC</p>
        
    </div>
  } 

  
  render() {
    console.log('this.state.aptBookings', this.state.aptBookings)
    return (

      <div className="apt-overview">
      
        <div className="paque">

          {this.state.aptBookings.length === 0 ? <p>LOADING !</p> :
          
          <p>here goes the graphic</p>}
      
        </div>
      
      </div>

    );
  };
};

