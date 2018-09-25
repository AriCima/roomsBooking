import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// SERVICE API
import DataService from '../../../Components/services/DataService';
import Calculations from '../../../Components/services/Calculations';


// MATERIAL-UI
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

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
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    background: 'rgb(0, 144, 248);',
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});
const yesNo = [
    {
      value: 'Yes',
      label: 'Yes',
    },
    {
      value: 'No',
      label: 'No',
    },
];
  

class RoomInput extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            userId: this.props.userEmailId.id,
            apartmentCode: this.props.aptID,
            roomNumber: '',
            roomCode: '',
            sqm: '',
            exterior: false,
            privateBathroom: false,
            balcony: false,
            price: null,
        };

        this.onNewRoom = this.onNewRoom.bind(this);
    }

    updateFormInput(field, value){
        let roomInfo = this.state;
        roomInfo[field] = value;
        this.setState(roomInfo) 
    };



    onNewRoom(e){
        e.preventDefault();
        let newState = this.state;

        DataService.addNewRoom(newState);
        this.props.propsFn.push(`/single_apt_overview/${this.state.apartmentCode}`); 
            
    }

  
  render() {
    const { classes } = this.props;

    console.log('RoomInput apartmentCode: ',this.props.aptID);

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>INPUT NEW ROOM</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewRoom}>
            
                <div id="input-area">

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Room#"
                            placeholder="Room Number"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.roomNumber}
                            onChange={(e)=>{this.updateFormInput('roomNumber', e.target.value)}}
                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Sqm"
                            placeholder="Square mts"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.sqm}
                            onChange={(e)=>{this.updateFormInput('sqm', e.target.value)}}
                        />
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            select
                            label="Exterior"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.exterior}
                            onChange={(e)=>{this.updateFormInput('exterior', e.target.value)}}
                        >
                            {yesNo.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            select
                            label="Private Bathroom"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.privateBathroom}
                            onChange={(e)=>{this.updateFormInput('privateBathroom', e.target.value)}}
                        >
                            {yesNo.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            select
                            label="Balcony"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.balcony}
                            onChange={(e)=>{this.updateFormInput('balcony', e.target.value)}}
                        >
                            {yesNo.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                 
                    <div id="input-fields">
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="adornment-amount">Montly rent</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.price}
                                onChange={(e)=>{this.updateFormInput('price', e.target.value)}}
                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                            />
                        </FormControl>
                    </div>
                    
                </div>

                <div className="button-area">
                    
                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                            Enviar
                        </Button>
                    
                </div>
            </form>
        </div>
    );
  }
}

RoomInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomInput);