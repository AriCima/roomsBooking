import React from 'react';

// SERVICE API
import DataService from '../../services/DataService';


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


const JamType = [
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
            userId: '',
            apartmentCode: '',
            apartmentName: '',
            street: '',
            houseNr: '',
            floor: '',
            door: '',
            zip: '',
            rentalType: '',
        };

        this.onChangeApartmentName = this.onChangeApartmentName.bind(this); 
        this.onChangeApartmentStreet = this.onChangeApartmentStreet.bind(this);  
        this.onChangeApartmentHouseNr = this.onChangeApartmentHouseNr.bind(this); 
        this.onChangeApartmentFloor = this.onChangeApartmentFloor.bind(this); 
        this.onChangeApartmentDoor = this.onChangeApartmentDoor.bind(this);
        this.onChangeApartmentZipCode = this.onChangeApartmentZipCode.bind(this); 
        this.onChangeRentalType =  this.onChangeRentalType.bind(this); 

        this.onNewApartment = this.onNewApartment.bind(this);
    }


    onChangeApartmentName(event){
        this.setState({apartmentName: event.target.value})
    };
    onChangeApartmentStreet(event){
        this.setState({street: event.target.value})
    };
    onChangeApartmentHouseNr(event){
        this.setState({houseNr: event.target.value})
    };
    onChangeApartmentFloor(event){
        this.setState({floor: event.target.value})
    };
    onChangeApartmentDoor(event){
        this.setState({door: event.target.value})
    };
    onChangeApartmentZipCode(event){
        this.setState({zip: event.target.value})
    };
    onChangeRentalType(event){
        this.setState({rentalType: event.target.value})
    };



    onNewApartment(e){
        e.preventDefault();
        let error = false;
        let newState = this.state;

        console.log('STATE AL ENVIAR EL FORM de NewApartment: ', this.state);

        if(!error){
           
            newState.userId = this.props.userEmailId.id;

            //console.log("NewState antes de enviar info al firebase", newState);
            
            //console.log('Request enviado \n El state del ApartmentInput es: ', this.state);

            // GENERATE APARTMENT CODE
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
            this.state.apartmentCode = code.join("").concat(t);

            //



            DataService.addNewApartment(newState.apartmentName, newState).then(
                (result)=>{
                    console.log(`userData luego del add-flat`, result)
                    this.props.history.push(`/apartment_overview/${Object.keys(result.apartmentName)}`)
                }
            )
            

        }
            
    };

  
  render() {
    const { classes } = this.props;

    console.log('la props id en RoomInput: ', this.props.userEmailId);

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>INPUT NEW JAM</h4>
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
                            onChange={this.onChangeApartmentName}
                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Street"
                            placeholder="Street"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.street}
                            onChange={this.onChangeApartmentStreet}
                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="House Nr"
                            placeholder="House Nr"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.houseNr}
                            onChange={this.onChangeApartmentHouseNr}
                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Floor"
                            placeholder="Floor"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.floor}
                            onChange={this.onChangeApartmentFloor}
                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Door"
                            placeholder="Door"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.door}
                            onChange={this.onChangeApartmentDoor}
                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Zip-Code"
                            placeholder="zipcode"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.zip}
                            onChange={this.onChangeApartmentZipCode}
                        />
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            select
                            label="Rental Type"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.rentalType}
                            onChange={this.onChangeRentalType}
                        >
                            {JamType.map(option => (
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
    );
  }
}

ApartmentInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApartmentInput);