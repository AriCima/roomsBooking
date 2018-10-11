import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// MATERIAL UI
import AddButton from '../../Components/Accessories/AddButton';

// COMPONENTS
//import UserOverview from '../User';

// DATA
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// CSS
import './index.css';



export default class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userId                  : '',
      apartments              : [],
      currentAptContracts     : [],
      rooms                   : [],
      currentRoomContracts    : [],
      aptsIncomes             : null,
      roomsIncomes            : null,
    }
    
  };


  componentDidMount() {
    if (this.props.userEmailId) {
    this._loadData(this.props.userEmailId.id);
    let inc = this._calculateIncomes(this.state.currentAptContracts, this.state.currentRoomsContracts );
    this.state.aptsIncomes = inc[0];
    this.state.roomsIncomes = inc[1];
    }
  };

  _loadData(userId){

    DataService.getUserApartments(userId)
    .then(apts => {
      const apartments = [];
      for (let j = 0; j < apts.length; j++){
        apartments[j]={
          apartmentName  : apts[j].apartmentName,
          id              : apts[j].id
        };
      };
  
      this.setState({ apartments });
      //console.log('apartments luego de aptName e ID', this.state.apartments)
    }).catch(function (error) {   
      // handle error
      console.log(error);
    })
  
    DataService.getUserRooms(userId)
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
  
    DataService.getUserAptContracts(userId)  // Once contracts are here, we get the CURRENT APT CONTRACT
    .then(userAptContracts => {
      console.log('userAptContracts en Home', userAptContracts)
    
      this.state.currentAptContracts = Calculations.getCurrentAptContracts(userAptContracts)
      
    
      
      for (let y = 0; y < this.state.apartments.length; y++){
        for (let k = 0; k < this.state.currentAptContracts.length; k++){
          if(this.state.apartments[y].id === this.state.currentAptContracts[k].apartmentCode){
            this.state.apartments[y].tenantName      = this.state.currentAptContracts[k].tenantName;
            this.state.apartments[y].tenantSurname   = this.state.currentAptContracts[k].tenantSurname;
            this.state.apartments[y].checkIn         = this.state.currentAptContracts[k].checkIn;
            this.state.apartments[y].checkOut        = this.state.currentAptContracts[k].checkOut;
            this.state.apartments[y].rPrice          = this.state.currentAptContracts[k].rentPrice;
          }
        }
        
      }

      this.state.aptsIncomes = this._calculateIncomes(this.state.currentAptContracts);
      
      //console.log('el apartments con curretContracts:', this.state.apartments);
  
    }).catch(function (error) {    
    console.log(error);
    })
  
    DataService.getUserRoomsContracts(userId)
    .then(userRoomsContracts => {
      
      this.state.currentRoomsContracts = Calculations.getCurrentRoomsContracts(userRoomsContracts)
     
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
      this.state.roomsIncomes = this._calculateAIncomes(this.state.currentRoomsContracts);
      //console.log('el rooms con curretContracts:', this.state.rooms);
  
    }).catch(function (error) {    
    console.log(error);
    })
  };

  _calculateIncomes(x){
    console.log('calculate incomes TRIGGERED');
    let incomes = 0;

    for (let f = 0; f < x.length; f++){
      incomes = incomes + Number(x[f].rentPrice);
    }

    return incomes
  }
  _renderRooms(){

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
    return this.state.apartments.map((dpts,j) => {
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
            {this.state.rentalType === 'Yes' && this._renderRooms(this.state.apartments[j].id)}
          </div>
        </Link>
      )
  })
  };
  componentDidUpdate(prevProps){
    if (!prevProps.userEmailId && this.props.userEmailId) {
      this._loadData(this.props.userEmailId.id);
    }

  };

  render() {

    if (!this.props.userEmailId) return <p>Loading  ...</p>;
    const userId = this.props.userEmailId.id;

    return (
      <div>

        <div className="user-overview">
         
          <p>TOTAL INCOMES = {this.state.aptsIncomes + this.state.roomsIncomes}</p>

        </div>

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
          {this.state.apartments.length === 0? <p>LOADING !</p> : this._renderApartments() }

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



