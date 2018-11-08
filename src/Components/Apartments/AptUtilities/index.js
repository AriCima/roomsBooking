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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
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


const utilityType = [
    {
        value: 'Electric',
        label: 'Electric',
    },
    {
        value: 'Gas',
        label: 'Gas',
    },
    {
        value: 'Water',
        label: 'Water',
    },
    {
        value: 'Heating',
        label: 'Heating',
    },
    {
        value: 'Internet',
        label: 'Internet',
    },
    {
        value: 'Expenses',
        label: 'Expenses',
    },
    {
        value: 'Commision',
        label: 'Commision',
    },
    {
        value: 'Garbage',
        label: 'Garbage',
    },
    {
        value: 'Insurance',
        label: 'Insurance',
    },
    {
        value: 'Cleaning',
        label: 'Cleaning',
    },
    {
        value: 'Maintenance',
        label: 'Maintenance',
    },
    {
        value: 'Repairment',
        label: 'Repairment',
    },
    {
        value: 'Other',
        label: 'Other',
    },

];

  

class AptUtilities extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            userId              : this.props.userID,
            apartmentCode       : this.props.aptID,
            roomCode            : '',
            utilityType         : '',
            amount              : '',
            comment             : '',
            utilityDeductible   : false,
            utilityDate         : '',
        };

        this.onNewUtility = this.onNewUtility.bind(this);
    }


    onChangeState(field, value){
        let utilityInfo = this.state;
        utilityInfo[field] = value;
        this.setState(utilityInfo)
        console.log('utilityInfo = ', utilityInfo)
    };

    onNewUtility(e){
        e.preventDefault();      
        
        let deductibles = ['Repairment', 'Insurance', 'Expenses', 'Commision']

        if(deductibles.indexOf(utilityType) <= 0){
            this.state.utilityDeductible = true;
        };

        let newState = this.state;
        console.log('newState en el expense = ', newState);
        DataService.addUtility(newState);
        this.props.propsFn.push(`/single_apt_overview/${this.state.apartmentCode}`);
        
    };

  
  render() {
    const { classes } = this.props;

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>ADD UTILITY</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewUtility}>
            
                <div id="input-area">

                    <div id="input-fields-select">
                        <TextField
                            select
                            label="Utility Type"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.utilityType}
                            onChange={(e)=>{this.onChangeState('utilityType', e.target.value)}}

                        >
                            {utilityType.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="amount"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.amount}
                            onChange={(e)=>{this.onChangeState('amount', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields-select">
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                defaultValue="dd/mm/yyyy"
                                className={classes.textField}
                                value={this.state.utilityDate}
                                onChange={(e)=>{this.onChangeState('utilityDate', e.target.value)}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Comment"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.comment}
                            onChange={(e)=>{this.onChangeState('comment', e.target.value)}}

                        />
                    </div>
                    
                </div>

                <div className="button-area">
                    
                    <Button variant="contained" color="primary" className={classes.button} type="submit">
                        Save
                    </Button>
                    
                </div>
            </form>
        </div>
    );
  }
}

AptUtilities.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AptUtilities);