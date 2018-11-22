import React from 'react';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

// COMPONENTS
import AlertDialogSlide from '../../Accessories/AlertDialog'

// DATABASE API
import DataService from '../../services/DataService';

// CALCULATIONS
import Calculations from '../../services/Calculations';


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
    background: 'rgb(237, 0, 117)',
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


const aptStates = [
    {
      value: 'Reserv',
      label: 'Reserv',
    },
    {
      value: 'Book',
      label: 'Book',
    },    
];
  

class RoomBookingsReview extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            userId          : this.props.userID,
            bookingCode     : this.props.bookingID,
            roomCode        : '',
            apartmentName   : '',
            apartmentCode   : '',
            checkIn         : '',
            checkOut        : '',
            tenantName      : '',
            tenantSurname   : '',
            tenantEmail     : '',
            tenantMobile    : '',
            unitState       : '',
            agency          : '',
            rentPrice       : '',
            deposit         : '',
            unitType        : 'Room',
            roomBookings     : [],
            modifiedData    : [],
        };

        this.onModify = this.onModify.bind(this);
    }


    componentDidMount(){

        DataService.getRoomBookingInfo(this.state.bookingCode)
        .then(res => {
            console.log('RES en el get Apt Booking',res)
            this.setState({
                roomCode        : res.roomCode,
                apartmentCode   : res.apartmentCode,
                apartmentName   : res.apartmentName,
                checkIn         : res.checkIn,      
                checkOut        : res.checkOut,     
                tenantName      : res.tenantName,   
                tenantSurname   : res.tenantSurname,
                tenantEmail     : res.tenantEmail,  
                tenantMobile    : res.tenantMobile, 
                unitState       : res.unitState,    
                agency          : res.agency,       
                rentPrice       : res.rentPrice,    
                deposit         : res.deposit,      
            })

            DataService.getRoomBookings(res.roomCode)
            .then((bookingsReceived) => {
                console.log("Bookings received", bookingsReceived)
        
                this.setState({roomBookings: bookingsReceived})
        
              }
            ); 
        })
        .catch(function (error) {    
            console.log(error);
        })

       
    };

    onChangeState(field, value){
        let bookInfo = this.state;
        bookInfo[field] = value;
        let modifiedField = field;
        this.state.modifiedData.push(modifiedField);
        this.setState(bookInfo);
    };

    onModify(e){
        e.preventDefault();
        let error = false;

        // DATES VALIDATION --->
        let datesValidation = Calculations.bookingsDatesValidation(this.state.checkIn, this.state.checkOut);
        error = datesValidation.error;
        if(error){
            alert(datesValidation.message);
        }
        // <---

        // OVERLAPPING CHECK --->
        let overlappingCheckOnReview =  Calculations.overlappingCheckOnReview(this.state.checkIn, this.state.checkOut, this.state.roomBookings, this.state.bookingCode);
        error = overlappingCheckOnReview.error;
        // <---

        if(error){
            alert(overlappingCheckOnReview.message);
        } else {

            let modifiedBooking = this.state;
            delete modifiedBooking.bookingCode;
            delete modifiedBooking.modifiedData;
            delete modifiedBooking.roomBookings;

            <AlertDialogSlide text={'Are you sure you want to modify this booking ?'}/>

            DataService.updateRoomBooking(this.props.bookingID, modifiedBooking);    
            this.props.propsFn.push(`/single_room_overview/${this.state.roomCode}`); 
        };
    };


    render() {
    const { classes } = this.props;

    return (

        <div className="apartment-booking">

            <div className="apt-form-container">

                <form  className={classes.container} noValidate autoComplete="off" onSubmit={this.onModify}>
                
                    <div id="apt-input-area">

                        <div id="input-fields-select">
                            <TextField
                                id="date"
                                label="Check-In"
                                type="date"
                                defaultValue="dd/mm/yyyy"
                                className={classes.textField}
                                value={this.state.checkIn}
                                onChange={(e)=>{this.onChangeState('checkIn', e.target.value)}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div id="input-fields-select">
                            <TextField
                                id="date"
                                label="Chec-kOut"
                                type="date"
                                defaultValue="dd/mm/yyyy"
                                className={classes.textField}
                                value={this.state.checkOut}
                                onChange={(e)=>{this.onChangeState('checkOut', e.target.value)}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div id="input-fields-select">
                            <TextField
                                select
                                label="State"
                                className={classNames(classes.margin, classes.textField)}
                                value={this.state.unitState}
                                onChange={(e)=>{this.onChangeState('unitState', e.target.value)}}
                            >
                                {aptStates.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div id="input-fields">
                            <TextField
                                id="with-placeholder"
                                label="Name"
                                placeholder="Guest Name"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.tenantName}
                                onChange={(e)=>{this.onChangeState('tenantName', e.target.value)}}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                id="with-placeholder"
                                label="Surname"
                                placeholder="Guest SurnName"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.tenantSurname}
                                onChange={(e)=>{this.onChangeState('tenantSurname', e.target.value)}}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                id="with-placeholder"
                                label="Email"
                                placeholder="Email"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.tenantEmail}
                                onChange={(e)=>{this.onChangeState('tenantEmail', e.target.value)}}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                id="with-placeholder"
                                label="Telephone"
                                placeholder="Tel"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.tenantMobile}
                                onChange={(e)=>{this.onChangeState('tenantMobile', e.target.value)}}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                id="with-placeholder"
                                label="Agency"
                                placeholder="Agency"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.agency}
                                onChange={(e)=>{this.onChangeState('agency', e.target.value)}}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                id="with-placeholder"
                                label="Price"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.rentPrice}
                                onChange={(e)=>{this.onChangeState('rentPrice', e.target.value)}}
                            />
                        </div>
                        <div id="input-fields">
                            <TextField
                                id="with-placeholder"
                                label="Deposit"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.deposit}
                                onChange={(e)=>{this.onChangeState('deposit', e.target.value)}}
                            />
                        </div>
                        

                    </div>

                    <div className="apt-booking-button">
                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                            Modify
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    );
    }
}

RoomBookingsReview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomBookingsReview);