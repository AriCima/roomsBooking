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
    }
    
  };


  componentDidMount() {
    if (this.state.userId) {
    this._loadData(this.state.userId);
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

      // Get Incomes from all User's apartments
      this.state.aptsIncomes = Calculations.calculateIncomes(this.state.currentAptContracts);
  
    }).catch(function (error) {    
    console.log(error);
    })
  
    DataService.getUserRoomsContracts(userId) 
    .then(userRoomsContracts => {
      
      this.state.currentRoomsContracts = Calculations.getCurrentRoomsContracts(userRoomsContracts)
    
      for (let y = 0; y < this.state.rooms.length; y++){
        for (let k = 0; k < this.state.currentRoomsContracts.length; k++){
          // console.log('this.state.rooms[y].id', this.state.rooms[y].id);
          // console.log('this.state.currentRoomsContracts[k].roomCode', this.state.currentRoomsContracts[k].roomCode)
          if(this.state.rooms[y].id === this.state.currentRoomsContracts[k].roomCode){
            this.state.rooms[y].tenantName      = this.state.currentRoomsContracts[k].tenantName;
            this.state.rooms[y].tenantSurname   = this.state.currentRoomsContracts[k].tenantSurname;
            this.state.rooms[y].checkIn         = this.state.currentRoomsContracts[k].checkIn;
            this.state.rooms[y].checkOut        = this.state.currentRoomsContracts[k].checkOut;
            this.state.rooms[y].rPrice          = this.state.currentRoomsContracts[k].rentPrice;
          }
        }
      }
      console.log('this.state.rooms', this.state.rooms)

      this.state.roomsIncomes = Calculations.calculateIncomes(this.state.currentRoomsContracts);
  
    }).catch(function (error) {    
    console.log(error);
    })

   
  };

  

 _renderRooms(aptID){

   console.log('_renderRooms TRIGGERED')
    let roomsToRender = []

    for (let r = 0; r < this.state.rooms.length; r++){
      if (this.state.rooms[r].apartmentCode === aptID)
      roomsToRender.push(this.state.rooms[r])
    };
    console.log('roomsToRender: ', roomsToRender);
    return roomsToRender.map((rooms,j) => {
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


    // for (let m = 0; m< this.state.apartments.length; m++){

    //   if (this.state.apartments[m].roomsRental === 'YES'){

    //     let roomsToRender = [];
    //     for( let y = 0; y<this.state.rooms.length; y++){
    //       if(this.state.rooms[y].apartmentCode === this.state.apartment[m].id){
    //         roomsToRender.push(this.state.rooms[y])
    //       }
          
    //       // https://thinkster.io/tutorials/iterating-and-rendering-loops-in-react

    //       return (
    //         <div>
    //           <Link className="apts-row" to={`/single_apt_overview/${this.state.apartments[m].id}`}> 
    //         <div className="apt-header">
    //           <div className="apts-info-block">
    //               <p>{this.state.apartments[m].apartmentName}</p>
    //           </div>
    //           <div className="apts-info-block-name">
    //               <p>{this.state.apartments[m].tenantName} {this.state.apartments[m].tenantSurname}</p>
    //           </div>
    //           <div className="apts-info-block">
    //               <p>{this.state.apartments[m].checkIn}</p>
    //           </div>
    //           <div className="apts-info-block">
    //               <p>{this.state.apartments[m].checkOut}</p>
    //           </div>
    //           <div className="apts-info-block-c">
    //               <p>{this.state.apartments[m].rPrice}</p>
    //           </div>
    //         </div>
    //       </Link>
    //           <Link className="apts-row" key={j} to={`/single_room_overview/${roomsToRender[y].id}`}>
    //         <div className="home-rooms-rows">
    //           <div className="rooms-home-block">
    //             <p>{roomsToRender[y].roomNumber}</p>
    //           </div>
    //           <div className="rooms-home-block-name">
    //             <p>{roomsToRender[y].tenantName} {this.state.rooms[y].tenantSurname}</p>
    //           </div>
    //           <div className="rooms-home-block">
    //             <p>{roomsToRender[y].checkIn}</p>
    //           </div>
    //           <div className="rooms-home-block">
    //             <p>{roomsToRender[y].checkOut}</p>
    //           </div>
    //           <div className="rooms-home-block-c">
    //             <p>{roomsToRender[y].rPrice}</p>
    //           </div>
    //         </div>
    //       </Link>
    //       </div>
    //       ) 
          

    //     }
    //   }else{
    //     render(
    //       <Link className="apts-row" to={`/single_apt_overview/${this.state.apartments[m].id}`}> 
    //         <div className="apt-header">
    //           <div className="apts-info-block">
    //               <p>{this.state.apartments[m].apartmentName}</p>
    //           </div>
    //           <div className="apts-info-block-name">
    //               <p>{this.state.apartments[m].tenantName} {this.state.apartments[m].tenantSurname}</p>
    //           </div>
    //           <div className="apts-info-block">
    //               <p>{this.state.apartments[m].checkIn}</p>
    //           </div>
    //           <div className="apts-info-block">
    //               <p>{this.state.apartments[m].checkOut}</p>
    //           </div>
    //           <div className="apts-info-block-c">
    //               <p>{this.state.apartments[m].rPrice}</p>
    //           </div>
    //         </div>
    //       </Link>
    //     )
    //   }
    // }

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
              { this._renderRooms(dpts.id)}
            </div>
          </Link>
        )
    })
  };


  render() {

    //console.log('this.state.userId del render Home: ', this.state.userId)
    if (!this.props.userID) return <p>Loading  ...</p>;
    //const userId = this.props.userID;

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



