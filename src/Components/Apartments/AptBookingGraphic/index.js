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
      // twelveMonths  : this._generate12MonthsArrays()[0],       // --> 12 months in nr starting from now
      // yearMonths    : this._generate12MonthsArrays()[1],       // --> 12 months in letters starting from now
      
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

  _generateGraphicsMonths(){
    let months  =  ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
    
    let today = new Date()
    let yyyy = Number(today.getFullYear());
    let cM = Number(today.getMonth()); // Current Month in numbers
  
    let oneYearArray = [];

    for ( let s = cM; s <=  11; s++){ 
      oneYearArray.push([months[s], yyyy])
    }

    for ( let s = 0; s < cM; s++){ 
      
      oneYearArray.push([months[s], yyyy+1])
    }

    return oneYearArray   // [0] = 'Mes' [1] = yyyy
  }

  _generateDays(mm,yy){   // x = 'Mes' y = yyyy
    let months  =  ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
    let daysOfMonth  = [31, 28, 31, 30,31, 30, 31, 31,30, 31, 30, 31];

    let nrDays = daysOfMonth[months.indexOf(x)];

    for (var d = 0; nrDays < days; d++){
      console.log('iteración del mes ', months[s], ' día ', (d+1))
    
      // BRING DATE TO (dd-Mm-yyyy) format
      let oneDay = {};
      oneDay.day= d+1;
      oneDay.month= mm;
      oneDay.year= yy;
      // default days style
      oneDay.background = 'rgba(124,252,0,0.6)';
      oneDay.width = (100 / days) + 'px';

      let dateToCompare = new Date(´${yy} + '-' yy´)

      // is oneDay between any check-in and check-out date ?
      for (var r = 0; r < this.state.aptBookings.length; r++){

        let checkin = new Date (this.state.aptBookings[r].checkIn);
        let checkout = new Date (this.state.aptBookings[r].checkOut);


        if ( oneDay >= checkin && oneDay <= checkout){  // styling BOOKED days
          oneDay.background = 'red'
        }
      }
      // STYLING "TODAY"
      let hoy= {};
      hoy.day = today.getDate();
      hoy.momth = months[Number(today.getMonth())];
      hoy.year = today.getFullYear();

      if( oneDay.day === hoy.day && oneDay.month === hoy.month && oneDay.year === hoy.year){
        oneDay.background = 'rgb(255,255,0)';
      }
      
      oneMonthArray.push(oneDay)
    }

  }
  // _generateYearContent(){
  //   let months  =  ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
  //   let daysOfMonth  = [31, 28, 31, 30,31, 30, 31, 31,30, 31, 30, 31];
    
  //   let today = new Date()
  //   let yyyy = Number(today.getFullYear());
  //   let cM = Number(today.getMonth()); // Current Month in numbers
    

  //   let oneMonthArray = [];
  //   let oneYearArray = [];

  //   // GENERAMOS LOS DIAS DE CADA MES DE ÉSTE Y DEL PRÓXIMO AÑO 

  //   for ( let s = cM; s <=  11; s++){   // --> for para generar el año en curso
  //     let days = daysOfMonth[s];
  //     for (var d = 0; d < days; d++){
  //       console.log('iteración del mes ', months[s], ' día ', (d+1))
  //       let day = yyyy + ', ' + (d+1) +', ' + months[cM]; 
        

  //       // BRING DATE TO (dd-Mm-yyyy) format
  //       let oneDay = {};
  //       oneDay.day= d+1;
  //       oneDay.month= months[s];
  //       oneDay.year= yyyy;
  //       // days standard tyling
  //       oneDay.background = 'rgba(124,252,0,0.6)';
  //       oneDay.width = (100 / days) + 'px';

  //       // VERIFICAMOS SI CADA DIA SE ENCUENTRA ENTRE ALGUN CHECKIN Y CHECKOUT
  //       for (var r = 0; r < this.state.aptBookings.length; r++){

  //         let checkin = new Date (this.state.aptBookings[r].checkIn);
  //         let checkout = new Date (this.state.aptBookings[r].checkOut);

  //         if ( oneDay >= checkin && oneDay <= checkout){  // styling BOOKED days
  //           oneDay.background = 'red'
  //         }
  //       }
  //       // STYLING "TODAY"
  //       let hoy= {};
  //       hoy.day = today.getDate();
  //       hoy.momth = months[Number(today.getMonth())];
  //       hoy.year = today.getFullYear();

  //       if( oneDay.day === hoy.day && oneDay.month === hoy.month && oneDay.year === hoy.year){
  //         oneDay.background = 'rgb(255,255,0)';
  //       }
        
  //       oneMonthArray.push(oneDay)
  //     }

  //     oneYearArray.push([months[s] + ',' + yyyy , oneMonthArray[s]])

  //     //console.log( 'oneYearArray en el primer bloque', oneYearArray)
  //   }

  //   for (var w = 0; w < (11-cM); w++){  // --> for para generar el próximo año
  //     let days = daysOfMonth[w];
  //     for (var d = 0; d < days; d++){
  //       let day = (yyyy+1) + ', ' + (d+1) +', ' + months[w];  // first day of the current month
  //       let g = new Date(day);

  //       // BRING DATE TO (dd-Mm-yyyy) format
  //       let oneDay = {};
  //       oneDay.date= g.getDate() + '-' + Number(g.getMonth()+1)+ '-' + g.getFullYear();
  //       // days styling
  //       oneDay.background = 'rgba(124,252,0,0.6)';
  //       oneDay.width = (100 / days) + 'px';

  //       // VERIFICAMOS SI CADA DIA SE ENCUENTRA ENTRE ALGUN CHECKIN Y CHECKOUT
  //       for (var r = 0; r < this.state.aptBookings.length; r++){

  //         let checkin = new Date (this.state.aptBookings[r].checkIn);
  //         let checkout = new Date (this.state.aptBookings[r].checkOut);

  //         if ( oneDay >= checkin && g <= checkout){  // styling BOOKED days
  //           oneDay.background = 'red'
  //         };
  //       }

  //       oneMonthArray.push(oneDay);
  //     }
  //     oneYearArray.push(months[w] + ',' + (yyyy+1), oneMonthArray[w]);
  //     //console.log( 'oneYearArray en el segundo bloque', oneYearArray)
  //   } 

  //   console.log( 'oneYearArray ', oneYearArray)
        
  //   return oneYearArray
  // }

  // _renderMonths(x){
    
  //   return x.map((months,i) => {

  //     return (

  //       <div className="month-container" key={i}>
          
  //         <div className="month-name">
  //           <p>{months}</p>
  //         </div>
        

          
  //       </div>
        
        
  //     )
  //   })
  // };

  // _renderDays(x){


  //   return x.map((days,i) => {

  //     return (

  //       <div className="days-container">

  //         <div className="single-day" key={i} style={{background: days.background, width:days.width}}>
  //           {/* {days.toLocaleDateString()} */}
  //         </div>
          
  //       </div>

  //     )
  //   })

  // }
  
  render() {

    let y =  this._generateGraphicsMonths()
    console.log('y en el render= ', y)
    return (

      <div className="graphic-area">
      
        

        {this.state.yearMonth === [] ? <p>LOADING !</p> :

        <div className="graphic-contanier">
          {/* {this._renderMonths()} */}
        </div>}
          
        
      
      </div>

    );
  };
};

