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
import DataService from '../../Components/services/DataService';




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


const roomStates = [
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
  

class RoomState extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            roomNumber: '',
            currentBookStartDate: '',
            currentBookEndDate: '',
            // currentReservStartDate:'',
            // currentReservEndDate:'',
            newStartDate: '',
            newEndDate: '',
            roomState: '',
            startDateError: false,
            endDateError: false,
            overlappingError: false,
        };

        this.onNewBook = this.onNewBook.bind(this);
    }

    updateFormInput(field, value){
        console.log('el field es:', field);
        console.log('el value es:', value);
        let roomInfo = this.state;
        roomInfo[field] = value;
        this.setState({roomInfo})

    };


    onNewBook(e){
        e.preventDefault();
        let error = false;

        var newStartDate = new Date(this.state.newStartDate);
        var newEndDate = new Date(this.state.newEndDate)
       
       if(!isDate(newStartDate)){
           this.setState({startDateError: true})
           error = true;
           console.log('The start Date is not an instance of Date')
       };

       if(!isValid(newEndDate)){
            this.setState({endDateError: true});
            error = true;
            console.log('The end Date is not valid')
        };


        if(!isAfter(newEndDate, newStartDate)|| isEqual(newEndDate, newStartDate)){
            this.setState({endDateError: true});
            error = true;
            alert('End date must be greater than Start Date')
        };



        if(areRangesOverlapping(newStartDate, newEndDate, this.state.currentBookStartDate,  this.state.currentBookEndDate)){
            this.setState({overlappingError: true});
            error = true;
            console.log('The range overlaps with a BOOKED range')
        };

        // if(areRangesOverlapping(newStartDate, this.state.newEndDate, this.state.reservStartDate, this.state.reservEndDate)){
        //     this.setState({overlappingError: true});
        //     error = true;
        //     console.log('The range overlaps with a RESERVED range')
        // }


        if(!error){
         
            this.state.currentBookStartDate = format(newStartDate, ['Do-MMM-YYYY']);
            this.state.currentBookEndDate = format(newEndDate,['Do-MMM-YYYY']);

            let newState = this.state;


            DataService.saveRoomNewState(newState.roomNumber, newState)  

            alert(`La hab ${this.state.roomNumber} se encuentra 
            ${this.state.roomState} entre el ${this.state.currentBookStartDate} y el ${this.state.currentBookEndDate}`);

        }
            
    }

  


  render() {
    const { classes } = this.props;

    return (

        <div className="room-state">


            <div className="form-container">

                <form  className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewBook}>
                
                    <div id="input-area">

                        <div id="input-fields">
                            <TextField
                                id="with-placeholder"
                                label="Room Nr"
                                placeholder="Room Number"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.roomNumber}
                                onChange={(e)=>{this.updateFormInput('roomNumber', e.target.value)}}
                            />
                        </div>

                        <div id="input-fields-select">
                            <TextField
                                id="date"
                                label="Start Date"
                                type="date"
                                defaultValue="dd/mm/yyyy"
                                className={classes.textField}
                                value={this.state.newStartDate}
                                onChange={(e)=>{this.updateFormInput('newStartDate', e.target.value)}}
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
                                onChange={(e)=>{this.updateFormInput('newEndDate', e.target.value)}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        
                        <div id="input-fields-select">
                            <TextField
                                select
                                label="Room State"
                                className={classNames(classes.margin, classes.textField)}
                                value={this.state.roomState}
                                onChange={(e)=>{this.updateFormInput('roomState', e.target.value)}}
                            >
                                {roomStates.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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

RoomState.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomState);