import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import AddButton from '../../Components/Accessories/AddButton';

// DATA
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// CSS
import './index.css';



export default class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userId                  : this.props.userEmailId.id,
      deptos                  : [],
      userAptContracts        : [],
      currentAptContracts     : [],
      rooms                   : [],
      currentRoomContracts    : [],
    }
    
  };


  componentDidMount() {
    
    DataService.getUserApartments(this.state.userId)
    .then(apts => {
    const deptos = [];
    for (let j = 0; j < apts.length; j++){
      deptos[j]={
        apartmentName  : apts[j].apartmentName,
        id              : apts[j].id
      };
    };

    this.setState({ deptos });
    //console.log('deptos luego de aptName e ID', this.state.deptos)
    }).catch(function (error) {   
    // handle error
    console.log(error);
    })

    DataService.getUserRooms(this.state.userId)
    .then(rs => {
    
      const rooms = [];
      for (let i = 0; i < rs.length; i++){
        rooms[i] = {
          roomNumber  : rs[i].roomNumber,
          id          : rs[i].id,
        };
      };
    this.setState({ rooms });
    //console.log('rooms luego de aptName e ID', this.state.rooms)
    }).catch(function (error) {   
    console.log(error);
    })

    DataService.getUserAptContracts(this.state.userId)
    .then(userAptContracts => {
      //console.log('userAptContracts en Home', userAptContracts)

      this.state.currentAptContracts = Calculations.getCurrentAptContracts(userAptContracts)
      //console.log('this.state.currentAptContracts', this.state.currentAptContracts);

      for (let y = 0; y < this.state.deptos.length; y++){

        for (let k = 0; k < this.state.currentAptContracts.length; k++){
  
          if(this.state.deptos[y].id === this.state.currentAptContracts[k].apartmentCode){
            this.state.deptos[y].tenantName      = this.state.currentAptContracts[k].tenantName;
            this.state.deptos[y].tenantSurname   = this.state.currentAptContracts[k].tenantSurname;
            this.state.deptos[y].checkIn         = this.state.currentAptContracts[k].checkIn;
            this.state.deptos[y].checkOut        = this.state.currentAptContracts[k].checkOut;
            this.state.deptos[y].rPrice          = this.state.currentAptContracts[k].rentPrice;
          }
        }
      
      }
      
      //console.log('el deptos con curretContracts:', this.state.deptos);

    }).catch(function (error) {    
    console.log(error);
    })

    DataService.getUserRoomsContracts(this.state.userId)
    .then(userRoomsContracts => {
      //console.log('userAptContracts en Home', userAptContracts)

      this.state.currentRoomsContracts = Calculations.getCurrentRoomsContracts(userRoomsContracts)
      //console.log('this.state.currentAptContracts', this.state.currentAptContracts);

      for (let y = 0; y < this.state.rooms.length; y++){

        for (let k = 0; k < this.state.currentRoomsContracts.length; k++){
  
          if(this.state.rooms[y].id === this.state.currentRoomsContracts[k].roomCode){
            this.state.rooms[y].tenantName      = this.state.currentRoomsContracts[k].tenantName;
            this.state.rooms[y].tenantSurname   = this.state.currentRoomsContracts[k].tenantSurname;
            this.state.rooms[y].checkIn         = this.state.currentRoomsContracts[k].checkIn;
            this.state.rooms[y].checkOut        = this.state.currentRoomsContracts[k].checkOut;
            this.state.rooms[y].rPrice          = this.state.currentRoomsContracts[k].rentPrice;
          }
        }
      
      }
      
      //console.log('el rooms con curretContracts:', this.state.rooms);

    }).catch(function (error) {    
    console.log(error);
    })

  };
  
  _renderRooms(aptID){

    return this.state.rooms.map((rooms,j) => {
        return (
          <Link className="rooms-home-row" key={j} to={`/single_room_overview/${rooms.id}`}> 
          
            <div className="rooms-home-block">
                <p>{rooms.roomNumber}</p>
            </div>
            <div className="rooms-home-block-name">
                <p>{rooms.tenantName} {rooms.tenantSurname}</p>
            </div>
            <div className="rooms-home-block">
                <p>{rooms.checkIn}</p>
            </div>
            <div className="rooms-home-block">
                <p>{rooms.checkOut}</p>
            </div>
            <div className="rooms-home-block-c">
                <p>{rooms.rPrice}</p>
            </div>
            
          </Link>
        )
    })
    
  }; 

  _renderApartments(){
    return this.state.deptos.map((dpts,j) => {
      return (
        <Link className="apts-row" key={j} to={`/single_apt_overview/${dpts.id}`}> 
        
          <div className="apts-info-block">
              <p>{dpts.apartmentName}</p>
          </div>
          <div className="apts-info-block-name">
              <p>{dpts.tenantName} {dpts.tenantSurname}</p>
          </div>
          <div className="apts-info-block">
              <p>{dpts.checkIn}</p>
          </div>
          <div className="apts-info-block">
              <p>{dpts.checkOut}</p>
          </div>
          <div className="apts-info-block-c">
              <p>{dpts.rPrice}</p>
          </div>
          <div>
            {this.state.rentalType === 'Yes' && this._renderRooms(this.state.deptos[j].id)}
          </div>
        </Link>
      )
  })
  }


  render() {
  

    return (
      <div>
        <div className="apts-list">

          <div className="page-title">
            <h3>My Apartments</h3>
          </div>

          <div className="apts-list-header">
            <ul>
              <li>ID</li>
              <li>Tenant</li>
              <li>Check-In</li>
              <li>Check-Out</li>
              <li>Rent (€/Mo)</li>
            </ul>          
          </div>
          {this.state.deptos.length === 0? <p>LOADING !</p> : this._renderApartments() }

        <div className="add-apartment">
          <p>Add apartment</p>
          <div className="add-apt-button">
            <Link to={`/apt_add/${this.state.userId}`}><AddButton/></Link>
          </div>
        </div>

      </div>

      </div>
    )

  }
}



