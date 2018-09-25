import React from 'react';

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';


// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

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


const rentMode = [
    {
      value: 'One Tenant',
      label: 'One Tenant',
    },
    {
      value: 'Multiple Tenants',
      label: 'Multiple Tenants',
    },
];
  

class ApartmentInput extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            userId: this.props.userID,
            apartmentName: '',
            street: '',
            houseNr: '',
            floor: '',
            door: '',
            zip: '',
            sqm: '',
            rooms: '',
            rentalType: '',
            rentPrice: '',
            deposit: '',
        };

        this.onNewApartment             = this.onNewApartment.bind(this);

    }


    onChangeState(field, value){
        let aptInfo = this.state;
        aptInfo[field] = value;
        this.setState(aptInfo)
    };

    onNewApartment(e){
        e.preventDefault();
        let newState = this.state;

        // GENERATE APARTMENT CODE
        let aptCode = Calculations.generateCode();

        DataService.addNewApartment(aptCode, newState);
        this.props.propsFn.push(`/home/${this.state.userId}`)
        
    };

  
  render() {
    const { classes } = this.props;

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>ADD NEW APARTMENT</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewApartment}>
            
                <div id="input-area">

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Apartment Name"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.apartmentName}
                            //onChange={this.onChangeApartmentName}
                            onChange={(e)=>{this.onChangeState('apartmentName', e.target.value)}}
                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Street"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.street}
                            //onChange={this.onChangeApartmentStreet}
                            onChange={(e)=>{this.onChangeState('street', e.target.value)}}
                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="House Nr"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.houseNr}
                            //onChange={this.onChangeApartmentHouseNr}
                            onChange={(e)=>{this.onChangeState('houseNr', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Floor"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.floor}
                            //onChange={this.onChangeApartmentFloor}
                            onChange={(e)=>{this.onChangeState('floor', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Door"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.door}
                            //onChange={this.onChangeApartmentDoor}
                            onChange={(e)=>{this.onChangeState('door', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Zip-Code"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.zip}
                            //onChange={this.onChangeApartmentZipCode}
                            onChange={(e)=>{this.onChangeState('zip', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Sqm"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.sqm}
                            //onChange={this.onChangeApartmentSqm}
                            onChange={(e)=>{this.onChangeState('sqm', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Nr of bedrooms"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.rooms}
                            //onChange={this.onChangeApartmentRooms}
                            onChange={(e)=>{this.onChangeState('rooms', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields-select">
                        <TextField
                            select
                            label="Rental Type"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.rentalType}
                            //onChange={this.onChangeRentalType}
                            onChange={(e)=>{this.onChangeState('rentalType', e.target.value)}}

                        >
                            {rentMode.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Standard Rent Price"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.rentPrice}
                            //onChange={this.onChangeRentPrice}
                            onChange={(e)=>{this.onChangeState('rentPrice', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Standard Deposit"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.deposit}
                            //onChange={this.onChangeDeposit}
                            onChange={(e)=>{this.onChangeState('deposit', e.target.value)}}

                        />
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

ApartmentInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApartmentInput);