import React from 'react';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

//DATE-FNS
import format from 'date-fns/format';
import areRangesOverlapping from 'date-fns/are_ranges_overlapping';
import getMonth from 'date-fns/get_month';

// DATABASE API
import DataService from '../../../services/DataService'

import './index.css'; 


export default class OccupationGraphic extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            user: null,
            occupation: {},
        };

    }

    componentDidMount(){

        DataService.getRoomsOccupation(this.props.userId).then(
      
        (roomsOccupationReceived) => {

        //console.log("Rooms Occupation received", roomsOccupationReceived)

        this.setState({occupation: roomsOccupationReceived})

        //console.log("Rooms del Manage state", this.state.occupation)

      }
    );  

    }
//   _renderOccupation(){
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
    
//     let today = new Date;
//     let currentMonth = getMonth(today);
//     console.log("Current Month cálculo", currentMonth);

//     let firstSixMonthsOcc = [];  // month's occup % from state
//     let secondSixMonthsOcc = [];   // month's occup % from state
//     let firstSixMonths = [];
//     let secondSixMonths = [];


    

//       if (currentMonth <= 5 ){

//         for (let i=0; i<=5; i++){
//           firstSixMonthsOcc[i] = this.state.occupation.monthDays.currentYear[i];   
//           firstSixMonths[i] = months[currentMonth + i];
//         }

//         for (var j = 0; j< 5; j++){
//           secondSixMonthsOcc[j] = this.state.occupation.monthDays.nextYear[j+5];
//           secondSixMonths[j] = months[currentMonth + j + 5];
//         }

//       } else {
//         for (let i=0; i<=11-currentMonth; i++){
//           firstSixMonthsOcc[i] = this.state.occupation.monthDays.currentYear[i];
//           firstSixMonths[i] = months[currentMonth + i];
//         }

//         for (let j=(11-(currentMonth)+1); j <= 5; j++){
//           firstSixMonthsOcc[j] = this.state.occupation.monthDays.nextYear[j];
//           firstSixMonths[j] = months[currentMonth + j];
//         }

//         for (var j = 0; j< 5; j++){
//           secondSixMonthsOcc[j] = this.state.occupation.monthDays.nextYear[5-(11-currentMonth)];
//           secondSixMonths[j] = months[currentMonth + j + 5];
//         }

//       }


//       return(
//         <div>
//           <p>{this.firstSixMonths}</p>
//           <p>{this.secondSixMonths}</p>
//         </div>
        
//       )
      
    

//     // let percent = [];
//     // let divStyle = {
//     //   background: `linear-gradient(
//     //       to right, 
//     //       rgba(128,128,128,0.3),
//     //       rgba(128,128,128,0.3) ${percent}%,
//     //       rgba(255,0,0,0.3) ${percent}%,
//     //       rgba(255,0,0,0.3)
//     //   ),
//     //}     


//     // return( 

//     //     <div className="months-boxes" style={divStyle}>
//     //         <p>Aug</p>
//     //     </div>
        

//     // )
  
    
// }

    _renderOccupation(){

        const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
        

        let today = new Date;
        let currentMonth = getMonth(today);
        
        let percent = 15;
        let divStyle = {
            background: `linear-gradient(
                to right, 
                rgba(128,128,128,0.3),
                rgba(128,128,128,0.3) ${this.percent}%,
                rgba(255,0,0,0.3) 50%,
                rgba(255,0,0,0.3)
            )`,
        }     

        
        return( 

            <div className="months-boxes" style={divStyle}>
                <p>Aug</p>
            </div>
            

        )
        
    }


  render() {

    
    
    return (

        <div className="rooms-timeline">
            {this._renderOccupation()}
        </div>
        
    );
  }
}