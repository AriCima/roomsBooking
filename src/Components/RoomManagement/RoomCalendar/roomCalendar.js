// https://github.com/clauderic/react-infinite-calendar

// https://codepen.io/alberss/pen/GZoaMN

// https://blog.flowandform.agency/create-a-custom-calendar-in-react-3df1bfd0b728

// https://github.com/BelkaLab/react-yearly-calendar

import React from 'react';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import MenuCalendar from '../Calendar'

import './index.css'; 
  

class RoomCalendar extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            roomNumber: '',
            startDate: '',
            endDate: '',
            roomState: '',
        };

        // this.onNewRequest = this.onNewRequest.bind(this);
    }

    updateFormInput(field, value){
        let roomInfo = this.state;
        roomInfo[field] = value;
        this.setState({roomInfo})

        var daysOfPeriod = [];
        for (var d = new Date(roomInfo.startDate); d <= new Date(roomInfo.endDate); d.setDate(d.getDate() + 1)) {
        daysOfPeriod.push(new Date(d));
}
    };

    // handleChangeSelect = portions => event => {
    //     this.setState({ [portions]: event.target.value });
    // };

    onNewRoom(e){
        e.preventDefault();
        let error = false;

        let newState = this.state;

        if(!error){
            console.log('El Estado de la Room es: ', this.state);


        }
            
    }

  


  render() {

    return (

        <div className="room-calendar">






        </div>
    );
  }
}

RoomCalendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomCalendar);