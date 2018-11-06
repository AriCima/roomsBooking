import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// MATERIAL UI
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
      userId                  : this.props.userID,
      apartments              : [],
      currentAptContracts     : [],
      rooms                   : [],
      currentRoomsContracts   : [],
      aptsWithRooms           : [],
      aptsIncomes             : null,
      roomsIncomes            : null,
      aptsExpenses            : null,
      roomsExpenses           : null,
      currentMonth            : Calculations.getCurrentMonth()
    }
 
  };


  componentDidMount() {
    if (this.state.userId) {
    this._loadData(this.state.userId);
    this.setState()
    }
  };

  _loadData(userId){

    DataService.getUserApartments(userId)
    .then(apts => {
      const apartments = [];
      for (let j = 0; j < apts.length; j++){
        apartments[j]={
          apartmentName   : apts[j].apartmentName,
          id              : apts[j].id,
          roomsRental     : apts[j].roomsRental,
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
          roomNumber    : rs[i].roomNumber,
          id            : rs[i].id,
          apartmentCode : rs[i].apartmentCode
        };
      };
    this.setState({ rooms });
    //console.log('rooms luego de aptName e ID', this.state.rooms)
    }).catch(function (error) {   
    console.log(error);
    })
    
    // We get all Apt Contracts saved
    DataService.getUserAptContracts(userId)  
    .then(userAptContracts => {

    
      //Once contracts are here, we get the CURRENT APT CONTRACT
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

      
      //console.log(console.log('this.state.apartments después del for for', this.state.apartments))

      // Get Incomes from all User's apartments
      let trans = Calculations.calculateIncomes(this.state.currentAptContracts); 
      this.setState({aptsIncomes : trans})
  
    }).catch(function (error) {    
    console.log(error);
    })

   // We get all Rooms Contracts saved
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
      // console.log('this.state.rooms', this.state.rooms)

      // Get Incomes from all User's rooms
      let trans = Calculations.calculateIncomes(this.state.currentRoomsContracts); 
      this.setState({roomsIncomes : trans})

    }).catch(function (error) {    
    console.log(error);
    })
   
  };

  _renderApartments(){
    return this.state.apartments.map((dpts,j) => {
      return (
        <div className="list-container">
          <Link className="apts-row" key={j} to={`/single_apt_overview/${dpts.id}`}> 
          
            <div className="apts-info-block">
               <p>{dpts.apartmentName}</p>
            </div>
            <div className="apts-info-block-name">
                { !dpts.tenantName && dpts.roomsRental === 'NO'? <p><span>Vacant</span></p>: <p>{dpts.tenantName} {dpts.tenantSurname}</p>}
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
          </Link>
            <div className="home-rooms-list">
              {this._renderRooms(dpts.id)}
            </div>
        </div>
      )
    })
  };

  _renderRooms(aptID){
     let roomsToRender = []
 
     for (let r = 0; r < this.state.rooms.length; r++){
       if (this.state.rooms[r].apartmentCode === aptID)
       roomsToRender.push(this.state.rooms[r])
     };

     // roomsToRender.sort( (fcion con 2 objetos)) ver partTime.
     //console.log('roomsToRender: ', roomsToRender);
     
     return roomsToRender.map((rooms,j) => {
         return (
           <Link className="rooms-home-row" key={j} to={`/single_room_overview/${rooms.id}`}> 
           
             <div className="rooms-home-block-nr">
                 <p>{rooms.roomNumber}</p>
             </div>
             <div className="rooms-home-block-name">
              {rooms.tenantName === undefined ? <p><span>Vacant</span></p>:<p>{rooms.tenantName} {rooms.tenantSurname}</p>}
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

  render() {

    if (!this.props.userID) return <p>Loading  ...</p>;

    return (
      <div className="home-super-container">

        <div className="e-figures">

          <div className="e-figures-left">
            <div className="chart-title">
              <p>Economic Overview: {this.state.currentMonth} </p>
            </div>
            <div className="user-overview">
            <div className="overview-block">
              <div className="overview-block-feature">
                <p>Gross Incomes</p>  
              </div>
              <div className="overview-block-value">
                <p>{this.state.aptsIncomes + this.state.roomsIncomes}</p>
              </div>
            </div>

            <div className="overview-block underlined">
              <div className="overview-block-feature">
                <p>Expenses</p>
              </div>
              <div className="overview-block-value">
              <p>{this.state.aptsExpenses + this.state.roomsExpenses}</p>
              </div>
            </div>

            <div className="overview-block">
              <div className="overview-block-feature">
                <p><span>EBDITA</span></p>
              </div>
              <div className="overview-block-value">
                <p><span>{this.state.aptsIncomes + this.state.roomsIncomes - (this.state.aptsExpenses + this.state.roomsExpenses)}</span></p>
              </div>
            </div>
          </div>

        </div>
        </div>
        
        <div className="units-list">

          <div className="page-title">
            <h3>Rentals Overview</h3>
          </div>

          <div className="units-list-header">
            <ul>
              <li>ID</li>
              <li>Tenant</li>
              <li>Check-In</li>
              <li>Check-Out</li>
              <li>Rent (€/Mo)</li>
            </ul>     
          </div>
          <div className="units-list-super-container">
            {this.state.apartments.length === 0? <p>LOADING !</p> : this._renderApartments() }     
          </div>

          <div className="add-button-left">
            <div id="add-button">
              <div>
                <p>Add apartment</p>
              </div>
              <div>
                <Link to={`/apt_add/${this.state.userId}`}><AddButton/></Link>
              </div>

          </div>

        </div>

      </div>

      </div>
    )

  }
}



