import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AddButton from '../../Accessories/AddButton';

// MATERIAL UI
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';


// SERVICE API
import DataService from '../../services/DataService';

//CSS
import './index.css';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    inputStyle: {
      color: 'rgb(237, 0, 117)',
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing.unit,
      background: 'rgb(237, 0, 117)',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

export default class Room extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      roomCode: this.props.roomID,
      apartmentCode: '',
      roomNumber: '',
      sqm:'',
      exterior: '',
      privateBathroom: '',
      balcony: '',
      price: '',
    }
  }

  componentDidMount(){
    
    DataService.getRoomInfo(this.state.roomCode).then(
      (roomsReceived) => {
        console.log("Rooms received", roomsReceived)

        this.setState({
            apartmentCode   : roomsReceived.apartmentCode,
            roomNumber      : roomsReceived.roomNumber,
            sqm             : roomsReceived.sqm,
            exterior        : roomsReceived.exterior,
            privateBathroom : roomsReceived.privateBathroom,
            balcony         : roomsReceived.balcony,
            price           : roomsReceived.price,
        })

        console.log("ApartmentCode en Room", this.state.roomCode)

      }
    );  
  }


  
  render() {

    return (
      
        <div className="form-container">


             <div className="form-container">

                <form   noValidate autoComplete="off" onSubmit={this.onPayment}>
                    <div id="input-area">

                        <div id="input-fields">
                            <TextField
                                disabled
                                label="Room Nr"
                                id="filled-disabled"
                                margin="normal"
                                variant="filled"
                                value={this.state.roomNumber}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                disabled
                                id="with-placeholder"
                                label="Square mts"
                                placeholder="Nombre cliente"
                                margin="normal"
                                value={this.state.sqm}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                disabled
                                id="with-placeholder"
                                label="Sqm"
                                margin="normal"
                                value={this.state.exterior}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                disabled
                                id="with-placeholder"
                                label="Private Bathroom"
                                margin="normal"
                                value={this.state.privateBathroom}
                            />
                        </div>
                        <div id="input-fields-select">
                            <TextField
                                disabled
                                label="Balcony"
                                value={this.state.balcony}
                            />
                        </div>
                        
                    </div>
                </form>

                <div className="add-booking-button">
                <div>
                    <p>New Book</p>
                </div>
                <div>
                    <Link to={`/room_newbooking/${this.state.roomCode}`}><AddButton/></Link>
                </div>
            </div>

            </div>
        </div>
    
    );
  }
}

