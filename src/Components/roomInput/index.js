import React from 'react';

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
            roomNumber: '',
            sqm: '',
            exterior: false,
            privateBathroom: false,
            balcony: false,
            price: 0,
        };

        // this.onNewRequest = this.onNewRequest.bind(this);
    }

    updateFormInput(field, value){
        let requestInfo = this.state;
        requestInfo[field] = value;
        this.setState({requestInfo})
    };

    // handleChangeSelect = portions => event => {
    //     this.setState({ [portions]: event.target.value });
    // };

    onNewRoom(e){
        e.preventDefault();
        let error = false;

        let newState = this.state;

        if(!error){
            console.log('El state del Register es: ', this.state.requestInfo);
            console.log('Formulario 1 enviado'); 

            this.props.newRequest(newState);
        }
            
    }

  


  render() {
    const { classes } = this.props;

    return (

        <div className="form-container">

            <form  className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewRequest}>
            
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

                    {/* <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Price"
                            placeholder="Price"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.price}
                            onChange={(e)=>{this.updateFormInput('price', e.target.value)}}
                        />
                    </div> */}
                 
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