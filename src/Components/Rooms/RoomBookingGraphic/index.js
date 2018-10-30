import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// CSS
import './index.css';

export default class RoomBookingsGraphic extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user          : this.props.userData,
      roomCode      : this.props.roomID,
      roomBookings  : [],
      bookedDays    : [],
      yearArray     : [],      
    }
  };
 
  componentDidMount(){
    if (this.state.roomCode) {
      this._loadData(this.state.roomCode); 
    }
  };

  _loadData(roomCode){
    DataService.getRoomBookings(roomCode)  
    .then(contracts => {
      this.setState({roomBookings : contracts});
    }).catch(function (error) {    
    console.log(error);
    })
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
    

    return oneYearArray.map((months,i) => {

      return (
        <div className="graphic-container">

          <div className="month-container" key={i}>
            
            <div className="month-name">
              <p>{months[0]}</p>
            </div>
            <div className="days-container">
              {this._generateDays(months[0], months[1])}
            </div>

          </div>

        </div>
      )
    })
    
  }

  _generateDays(mm,yy){   // x = 'Mes' y = yyyy
    let months  =  ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
    let daysOfMonth  = [31, 28, 31, 30,31, 30, 31, 31,30, 31, 30, 31];
    let oneMonthArray = [];

    let today = new Date();
   
    let nrDays = daysOfMonth[months.indexOf(mm)];

    for (var d = 0; d < nrDays; d++){
      //console.log('iteración del mes ', months[s], ' día ', (d+1))
    
      // BRING DATE TO (dd-Mm-yyyy) format
      let oneDay = {};
      oneDay.day= d+1;
      oneDay.month= mm;
      oneDay.year= yy;
      // default days style
      oneDay.background = 'rgba(124,252,0,0.6)';
      oneDay.width = (100 / nrDays) + 'px';

      let dateToCompare = new Date(d+1 + '-' + mm + '-' + yy);

      // VERIFY: is oneDay between any check-in and check-out date ?
      for (var r = 0; r < this.state.roomBookings.length; r++){

        let checkin = new Date (this.state.roomBookings[r].checkIn);
        let checkout = new Date (this.state.roomBookings[r].checkOut);


        if ( dateToCompare >= checkin && dateToCompare <= checkout){  // styling BOOKED days
          oneDay.background = 'red'
        }
      }
      // STYLING "TODAY"
      let hoy= {};
      hoy.day = today.getDate();
      hoy.month = months[Number(today.getMonth())];
      hoy.year = today.getFullYear();

      if( oneDay.day === hoy.day && oneDay.month === hoy.month && oneDay.year === hoy.year){
        oneDay.background = 'rgb(255,255,0)';
      } 

      oneMonthArray.push(oneDay)
    }


    return oneMonthArray.map((days, i) => {

      return(
        <div className="days-container">

          <div className="single-day" key={i} style={{background: days.background, width:days.width}}>
            {/* {days.toLocaleDateString()} */}
          </div>
          
        </div>
      )
    });

  };
  
  
  render() {
    return(
 
    <div className="graphic-area">

       {this._generateGraphicsMonths()}
      
    </div>
  )};
};


// _generateRoomsGraphicsList(z){


//   return z.map((room, i) => {
//     return(
//         <div className="graphic-container">

//         <div className="room-nr">
//           <div className="room-nr-text">
//             <p>Room Nr</p>
//           </div>
//           <div className="room-nr-nr">
//             <p>{room.roomNumber}</p>
//           </div>
//         </div>

//         <div className="graphic">
//           {this._generateGraphicsMonths(room.roomCode)}
//         </div>
//         </div>
//     )
//   })
// };


  // _getBookedDays(x){
    
  //   // Get days between two dates:  https://stackoverflow.com/questions/4345045/javascript-loop-between-date-ranges

  //   var bookedDays = [];
  //   for (let i = 0; i < x.length; i++ ){
  //     for (var d = new Date(x[i].checkIn); d <= new Date(x[i].checkOut); d.setDate(d.getDate() + 1)) {
  //       bookedDays.push(new Date(d));
  //     }
  //   }
  //   this.state.bookedDays = bookedDays
  // }