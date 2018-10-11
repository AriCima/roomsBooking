import React, { Component } from 'react';

// SERVICE API
import DataService from '../services/DataService';

// CSS
import './index.css';

export default class UserOverview extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user                  : this.props.user,
      apartments            : [],
      rooms                 : [],
      currentAptContracts   : this.props.currentAptContracts,
      currentRoomContracts  : this.props.currentRoomContracts,
      incomes               : null
    }
  }
 
  componentDidMount(){
    if (this.state.user) {
        this._loadUserData(this.state.user)
    }
  }


  _loadUserData(user){
    DataService.getUserApartments(user)
    .then((apts) => {
      this.setState({ apartments: apts});
    }).catch(function (error) {   
      console.log(error);
    })

    DataService.getUserRooms(user)
    .then((roomsReceived) => {
        this.setState({rooms: roomsReceived})
      })
    .catch(function (error) {    
        console.log(error);
    }); 
    
  }

  _caulculateIncomes(apts, rooms){
      let aptIncomes = 0;
      let roomIncomes = 0;
      let totalIncomes = 0;

      for (let i = 0; i<apts.length; i++){
          aptIncomes = aptIncomes + apts[i].rentPrice
      };
      for (let j = 0; j<rooms.length; j++){
        roomIncomes = roomIncomes + rooms[j].rentPrice
    }

    totalIncomes = aptIncomes + roomIncomes;
    this.setState({incomes :  totalIncomes})

  }

  componentDidUpdate(prevProps){
    console.log('DID UPDATE Launched')
    if (!prevProps.user && this.props.user) {
      this._loadUserData(this.props.user)
      this._calculateIncomes(this.state.currentAptContracts, this.state.currentRoomContracts);
    }
  
  };

  render() {
    
    return (

        <div className="user-overview">
          
          <p>props APT Contracts: { this.state.currentAptContracts}</p>
          <p>props RoomContracts: { this.state.currentRoomContracts}</p>
            {this.state.user === null ? <p>LOADING !</p> :
                <div className="user-ovw-title">
                    <h4>Apartments: {this.state.apartments.length}, Rented: to calculate</h4>
                    <h4>Rooms: {this.state.rooms.length}, Rented: to calculate</h4>
                    <h4>Incomes: {this.state.incomes}</h4>
                </div>
            
            }
      
        </div>

        

    );
  };
};

