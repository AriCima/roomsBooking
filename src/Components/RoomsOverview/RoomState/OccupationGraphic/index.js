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
            bookings: [],
        };

    }

    componentDidMount(){

        DataService.getRoomOccupation('XPehl23JyqfV2CJmwtohLTOTkUN2','ari 1').then(
            (userData)=>{
              console.log('userData en OccupationGraphic: ', userData);
              //this.state.bookings = userData;


              this.setState({bookings : userData});

              console.log('this.state.bookings en OccupationGraphics:', this.state.bookings)
            }, 
            (errorMessage)=>{
              console.log(errorMessage)
            }
        )

    }

    _renderOccupation(){

        const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
        

        let today = new Date;
        let currentMonth = getMonth(today);
        
        let percent = 15;
        let divStyle = {
            background: `linear-gradient(
                to right, 
                rgba(128,128,128,0.3),
                rgba(128,128,128,0.3) ${percent}%,
                rgba(255,0,0,0.3) ${percent}%,
                rgba(255,0,0,0.3)
            )`,
        }     

        for (var i = 0; i<12; i++){


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