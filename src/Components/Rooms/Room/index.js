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
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
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

    const { classes } = this.props;

    return (
      
        <div className="form-container">

            <div className="form-title">
                <h4>ROOM INFO</h4>
                <p>{this.state.roomNumber}</p>
                <p>{this.state.balcony}</p>
            </div>

            {/* <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewRoom}>
            
                <div id="input-area">

                    <div id="input-fields">
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Room#"
                            className={classNames(classes.margin, classes.textField)}
                            margin="normal"
                            value={this.state.roomNumber}
                            //onChange={(e)=>{this.updateFormInput('roomNumber', e.target.value)}}
                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Sqm"
                            className={classNames(classes.margin, classes.textField)}
                            margin="normal"
                            value={this.state.sqm}
                            //onChange={(e)=>{this.updateFormInput('sqm', e.target.value)}}
                        />
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Exterior"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.exterior}
                            //onChange={(e)=>{this.updateFormInput('exterior', e.target.value)}}
                        >
                        </TextField>
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Private Bathroom"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.privateBathroom}
                            //onChange={(e)=>{this.updateFormInput('privateBathroom', e.target.value)}}
                        >
                        </TextField>
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Balcony"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.balcony}
                            //onChange={(e)=>{this.updateFormInput('balcony', e.target.value)}}
                        >
                        </TextField>
                    </div>
                 
                    <div id="input-fields">
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="adornment-amount">Monthly rent</InputLabel>
                            <Input
                                disabled
                                id="filled-disabled"
                                className={classNames(classes.margin, classes.textField)}
                                value={this.state.price}
                                //onChange={(e)=>{this.updateFormInput('price', e.target.value)}}
                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                            />
                        </FormControl>
                    </div>
                    
                </div>

        


            </form> */}


                <div className="add-booking-button">
                    <div>
                        <p>New Book</p>
                    </div>
                    <div>
                        <Link to={`/room_newbooking/${this.state.roomCode}`}><AddButton/></Link>
                    </div>
                </div>


        </div>
    


    );
  }
}

