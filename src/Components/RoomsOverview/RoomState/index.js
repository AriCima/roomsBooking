import React from 'react';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

//DATE-FNS
import isDate from 'date-fns/is_date';
import isValid from 'date-fns/is_valid';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';
import format from 'date-fns/format';
import areRangesOverlapping from 'date-fns/are_ranges_overlapping';

// DATABASE API
import DataService from '../../services/DataService';

import './index.css'; 


export default class RoomsState extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            user: null,
        };

    }


  render() {

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
    
    return (

        <div className="rooms-timeline">

            <h1>ROOMS TIME LINES GO HERE</h1>

            <div className="months-boxes" style={divStyle}>
                <p>Aug</p>
            </div>
           

            <div className="picture">
                <img src={require('../../../assets/bookChart.png')}/>
            </div>
            <div className="picture">
                <img src={require('../../../assets/bookChart.png')}/>
            </div>

        </div>
    );
  }
}