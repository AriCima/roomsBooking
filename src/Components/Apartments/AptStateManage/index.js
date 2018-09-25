import React from 'react';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

//DATE-FNS


// DATABASE API
import DataService from '../../../services/DataService';




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

    {
    value: 'Available',
    label: 'Available',
    },
    
];
  

class ApartmentState extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            bookingCode: null,
            guest:'',
            bookingDays: {
                currentYear: [0,0,0,0,0,0,0,0,0,0,0,0],
                nextYear:[0,0,0,0,0,0,0,0,0,0,0,0]},  // Próximos 2 años, cada posición indica los días "alquilados" de cada habitación.
            state:'',
            agency:'',
            userId: '',
            apartmentCode: '',
            newStartDate: '',
            newEndDate: '',
            apartmentState: '',
            startDateError: false,
            endDateError: false,
            overlappingError: false,
        };

        this.onNewBook = this.onNewBook.bind(this);
    }


    onChangeState(field, value){
        let bookInfo = this.state;
        booktInfo[field] = value;
        this.setState(bookInfo)
    
    };

    onNewBook(e){
        e.preventDefault();
        let error = false;

        validation = Calculations.bookingsDatesValidation();
        error = validation.error;

        if(error){
         alert(validation.message);
        };

        if(!error){

         this.state.bookingCode = Calculations.generateCode()
         this.state.bookingDays = Calculations.getMonthsOccupationInPercentage()

         //CHECKPOINT
         console.log(' AptState bookingDays: ',  this.state.bookingDays);

         let newState = this.state;
         console.log('newSate en el AptBookings: ', newState)

         DataService.addRoomNewState(this.state.userId, this.state.roomNumber,this.state.bookingCode,  this.state.newStartDate, this.state.newEndDate, this.state.guest, this.state.agency, this.state.bookingDays);  
        };
    };
   

  render() {
    const { classes } = this.props;

    return (

        <div className="room-state">

            <p>{this.props.apartmentCode}</p>
            <p>{this.props.apartmentName}</p>

            <div className="form-container">

                <form  className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewBook}>
                
                    <div id="input-area">

                        <div id="input-fields-select">
                            <TextField
                                id="date"
                                label="Start Date"
                                type="date"
                                defaultValue="dd/mm/yyyy"
                                className={classes.textField}
                                value={this.state.newStartDate}
                                //onChange={this.onChangeNewStartDate}
                                onChange={(e)=>{this.onChangeState('newStartDate', e.target.value)}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        <div id="input-fields-select">
                            <TextField
                                id="date"
                                label="End Date"
                                type="date"
                                defaultValue="dd/mm/yyyy"
                                className={classes.textField}
                                value={this.state.newEndDate}
                                //onChange={this.onChangeNewEndDate}
                                onChange={(e)=>{this.onChangeState('newEndDate', e.target.value)}}
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
                                value={this.state.apartmentState}
                                //onChange={this.onChangeNewApartmentState}
                                onChange={(e)=>{this.onChangeState('apartmentState', e.target.value)}}
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
                                label="Guest Name"
                                placeholder="Guest Name"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.guest}
                                //onChange={this.onChangeGuest}
                                onChange={(e)=>{this.onChangeState('guest', e.target.value)}}
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
                                // onChange={this.onChangeAgency}
                                onChange={(e)=>{this.onChangeState('agency', e.target.value)}}
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

        </div>
    );
  }
}

ApartmentState.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApartmentState);