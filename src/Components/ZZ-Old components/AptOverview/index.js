import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import AddButton from '../../Accessories/AddButton';

// API
import DataService from '../../services/DataService'

import './index.css';

class ApartmentsOverview extends Component {
  constructor(props){
    super(props)

    this.state = {
      userId: this.props.userEmailId.id,
      apartments: []
    };

   
  }
  
  componentDidMount() {
    
    DataService.getUserApartments(this.state.userId)
    .then(apts => {
    const apartments = apts;
    
    this.setState({ apartments });
    })
    .catch(function (error) {    // ataja el error: no rompe la app
    // handle error
    console.log(error);
    })
  };

  _renderApartments(){
    return this.state.apartments.map((apt,i) => {
      return (
        
          <Link className="apts-row" to={`/single_apt_overview/${apt.id}`} key={i}>
            <div className="apts-info-block">
              <p>{apt.apartmentName}</p>
            </div> 
            <div className="apts-info-block-b">
              <p>{apt.rentalType}</p>
            </div>
          </Link>
        
      )
    })
  } 

  render() {
  

    return (

      <div className="apts-list">

        <div className="page-title">
          <h3>My Apartments</h3>
        </div>

        <div className="apts-list-header">
          <ul>
            <li>Name</li>
            <li>Rent Type</li>
            
          </ul>          
        </div>
        {this.state.apartments.length === 0? <p>LOADING !</p> : this._renderApartments() }

      <div className="add-apartment">
        <p>Add apartment</p>
        <div className="add-apt-button">
          <Link to={`/apt_add/${this.state.userId}`}><AddButton/></Link>
        </div>
      </div>

    </div>

    )

  }
}

export default ApartmentsOverview;
