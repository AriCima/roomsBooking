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
      user          : this.props.userData,
      apartmentCode : this.props.aptID,
      aptBookings   : [],
      bookedDays    : [],
      currentDay    : Calculations.getCurrentMonth()[0],
      currentMonth  : Calculations.getCurrentMonth()[1],
      twelveMonths  : this._generate12MonthsArrays()[0],       // --> 12 months in nr starting from now
      yearMonths    : this._generate12MonthsArrays()[1],       // --> 12 months in letters starting from now
      
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
      this.state.aptBookings = contracts
      this._getBookedDays(contracts)
    }).catch(function (error) {    
    console.log(error);
    })
  }

  _getBookedDays(x){
    
    // Get days between two dates:  https://stackoverflow.com/questions/4345045/javascript-loop-between-date-ranges

    var bookedDays = [];
    for (let i = 0; i < x.length; i++ ){
      for (var d = new Date(x[i].checkIn); d <= new Date(x[i].checkOut); d.setDate(d.getDate() + 1)) {
        bookedDays.push(new Date(d));
      }
    }
    this.state.bookedDays = bookedDays
  }

  // generate 12 months arrays (one in numbers, other in letters) starting today
  _generate12MonthsArrays(){
    let months  =  ['Jan', 'Feb', 'Mar', 'Apr',
                    'May', 'Jun', 'Jul', 'Aug', 
                    'Sep', 'Oct', 'Nov', 'Dec'];
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth(); //January is 0!
    
    
    let twelveMonths = [];
    
    //  --> Create an Array with of 12 months (in numbers) starting TODAY
    for (let l=0; l<= 11; l++){
      let k = mm+l;
      twelveMonths.push(k);

      if(twelveMonths[l]>=12){
        let trans = twelveMonths[l] - 12;
        twelveMonths[l] = trans;
      }

    } // <--

    let yearMonths = [];
    //  --> Create an Array with of 12 months (in Names) starting TODAY
    for (let p=0; p <= 11; p++){
       
       let j = '';
      // if(Number(twelveMonths[p]) === 0){
      //   j = months[11];
      //  yearMonths.push(j);

      // } else{
        j = months[Number(twelveMonths[p])];
        yearMonths.push(j);
      //console.log('months letters', months[Number(twelveMonths[l]-1)])
      //}
    }

    let oneYearMonths = [twelveMonths, yearMonths]

    return oneYearMonths    
  }; 

  _renderMonths(y){ // y = this.state.yearMonth

    return y.map((months,i) => {
      return (
        
        <div className="month-container" key={i}>
          
            <div className="month-name">
              <p>{months}</p>
            </div>
          
            <div className="days-container">
              {this._renderDays(months)}
            </div>
          
        </div>

      )
  })
  }

  _renderDays(x){
    let months  =  ['Jan', 'Feb', 'Mar', 'Apr',
                    'May', 'Jun', 'Jul', 'Aug', 
                    'Sep', 'Oct', 'Nov', 'Dec'];
    let daysOfMonth  = [31, 28, 31, 30,
                        31, 30, 31, 31,
                        30, 31, 30, 31];

    let today = new Date()
    let yyyy = today.getFullYear();
    let monthIndex = months.indexOf(x);
    let days = daysOfMonth[monthIndex];
    let completeMonth = []; 

    
    // GENERAMOS LOS DIAS DE CADA MES CON SUS ESTILOS
    for (var d = 0; d < days; d++){
       
      let day = yyyy + ', ' + (d+1) +', ' + x;  // first day of the current month
      
      console.log(' vemos day = ', day)
      let g = new Date(day);
      console.log('vemos g = ', g)
      // asignamos style
      let todayShort = today.getDate() + '-' + Number(today.getMonth()+1) + '-' + today.getFullYear();
      let gShort = g.getDate() + '-' + Number(g.getMonth()+1)+ '-' + g.getFullYear();
      
      g.background = 'rgba(124,252,0,0.6)';
      g.width = (100 / days) + 'px';
      
      // VERIFICAMOS SI CADA DIA SE ENCUENTRA ENTRE ALGUN CHECKIN Y CHECKOUT
      for (var r = 0; r < this.state.aptBookings.length; r++){

        let checkin = new Date (this.state.aptBookings[r].checkIn);
        let checkout = new Date (this.state.aptBookings[r].checkOut);

        if ( g >= checkin && g <= checkout){

          g.background = 'red'

        }
      }
      if( gShort === todayShort){
        g.background = 'rgb(255,255,0)';
      }


      completeMonth.push(g);

    }

    return completeMonth.map((days,i) => {

      return (
        
        <div className="single-day" key={i} style={{background: days.background, width:days.width}}>
          {/* {days.toLocaleDateString()} */}
        </div>
      )
    })
  };
  
  render() {
    console.log('el bookings = ', this.state.aptBookings)
    console.log('el booked days = ', this.state.bookedDays)

    let y = this._generate12MonthsArrays()[1]

    return (

      <div className="graphic-area">
      
        

        {this.state.yearMonth === [] ? <p>LOADING !</p> :

        <div className="graphic-contanier">
          {this._renderMonths(y)}
        </div>}
          
        
      
      </div>

    );
  };
};

