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
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';

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


        // this.onChangeApartmentCode     = this.onChangeApartmentCode.bind(this); 
        this.onChangeNewStartDate           = this.onChangeNewStartDate.bind(this); 
        this.onChangeNewEndDate             = this.onChangeNewEndDate.bind(this); 
        this.onChangeNewApartmentState      = this.onChangeNewApartmentState.bind(this);
        this.onChangeGuest                  = this.onChangeGuest.bind(this);
        this.onChangeAgency                 = this.onChangeAgency.bind(this);

        this.onNewBook                      = this.onNewBook.bind(this);
    }

    // onChangeApartmentCoder(event){
    //     this.setState({apartmentCode: event.target.value})
    // }

    onChangeNewStartDate(event){
        this.setState({newStartDate: event.target.value})
    }

    onChangeNewEndDate(event){
        this.setState({newEndDate: event.target.value})
    }

    onChangeNewApartmentState(event){
        this.setState({apartmentState: event.target.value})
    }
    onChangeGuest(event){
        this.setState({guest: event.target.value})
    }
    onChangeAgency(event){
        this.setState({agency: event.target.value})
    }


    onNewBook(e){
        e.preventDefault();
        let error = false;
        let newState = this.state;

        console.log("llamada a new book OK");

        let newStartDate = new Date(this.state.newStartDate);
        let newEndDate = new Date(this.state.newEndDate);
       
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

        if(!isAfter(newEndDate, newStartDate) || isEqual(newEndDate, newStartDate)){
            this.setState({endDateError: true});
            error = true;
            alert('End date must be greater than Start Date')
        };

        if(areRangesOverlapping(newStartDate, newEndDate, this.state.currentBookStartDate,  this.state.currentBookEndDate)){
            this.setState({overlappingError: true});
            error = true;
            console.log('The range overlaps with a BOOKED range')
        };

        if(!error){
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
            const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            console.log("no hay error en el book");
         
            newState.userId = this.props.userEmailId.id;
            this.state.currentBookStartDate = format(newStartDate, ['Do-MMM-YYYY']);
            let bookStartDay = getDate(newStartDate);   //Día (en número) del final de la reserva
            let bookStartMonth = getMonth(newStartDate);   //Mes (en número) del inicio de reserva
            let bookStartYear = getYear(newStartDate);     // Año del inicio de reserva

            // CHECKPOINT
            // console.log('RoomStateManagemetn día inicial: ',bookStartDay)
            // console.log('RoomStateManagemetn mes inicial: ',months[bookStartMonth])
            

            this.state.currentBookEndDate = format(newEndDate,['Do-MMM-YYYY']);
            let bookEndDay = getDate(newEndDate);       //Día (en número) del inicio de la reserva
            let bookEndMonth = getMonth(newEndDate);    //Mes (en número) del final de la reserva
            let bookEndYear = getYear(newEndDate);      // Año del final de la reserva

            // GENERATE BOOKING CODE
            const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
            let code = [];

            for (let l=0; l<4; l++){
                let capital = Math.round(Math.random()*10);
                let random = Math.round(Math.random()*26);

                if(Number.isInteger(capital/2)){
                    code[l]=(letters[random]).toUpperCase();
                } else {
                    code[l]=letters[random];
                }
            }

            let d = new Date();
            let t = d.getTime().toString().slice(-8);  // el bookCode = milisegundos

            let bCode = code.join("").concat(t);
            
            // CHECK POINT
            // console.log('El bookingCode generado es: ', generatedBookingCode)



            let newBookingDays = {
                currentYear: [0,0,0,0,0,0,0,0,0,0,0,0],
                nextYear:[0,0,0,0,0,0,0,0,0,0,0,0]
            };

            if(bookStartYear == bookEndYear){

                for (let i = bookStartMonth; i<= bookEndMonth; i++){
                    if (i == bookStartMonth){
                    newBookingDays.currentYear[i] = Math.round((((days[i]-bookStartDay)/days[i])*100))
                    } else if (i === bookEndMonth){             
                        newBookingDays.currentYear[i] = Math.round(((bookEndDay/days[i])*100))
                    } else if (bookStartMonth < i && i < bookEndMonth){
                        newBookingDays.currentYear[i] = 100;
                    }else {
                        newBookingDays[i] = 0;
                    }
                };

                this.state.bookingCode = bCode;
                this.state.bookingDays = newBookingDays;

            } else if ( bookStartYear < bookEndYear){

                for (let j = bookStartMonth; j<= 11; j++){
                    if (j == bookStartMonth){
                        newBookingDays.currentYear[j] = Math.round((((days[j]-bookStartDay) /days[j])*100))
                    } else {
                        newBookingDays.currentYear[j] = 100;
                    }
                }

                for (let k = 0; k<= bookEndMonth; k++){
                    if (k < bookEndMonth){
                        newBookingDays.nextYear[k] = 100;
                    } else if (k === bookEndMonth){             
                        newBookingDays.nextYear[k] = Math.round(((bookEndDay/days[k])*100))
                    }
                }

                this.state.bookingCode = bCode;
                this.state.bookingDays = newBookingDays;
            };
           
        

            //CHECKPOINT
            console.log(' this.state.bookingInfo: ',  this.state.bookingInfo);
            console.log("newState.roomNumber = ", newState.roomNumber);

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
                                onChange={this.onChangeNewStartDate}
                                // onChange={(e)=>{this.updateFormInput('newStartDate', e.target.value)}}
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
                                onChange={this.onChangeNewEndDate}
                                // onChange={(e)=>{this.updateFormInput('newEndDate', e.target.value)}}
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
                                onChange={this.onChangeNewApartmentState}
                                // onChange={(e)=>{this.updateFormInput('roomState', e.target.value)}}
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
                                onChange={this.onChangeGuest}
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
                                onChange={this.onChangeAgency}
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