import React, { Component } from 'react';

// FIREBASE
import * as firebase from 'firebase';

// APP COMPONENTS
import Register from '../Access/Register';
import Login from '../Access/Login';
import RoomInput from '../RoomInput';
import RoomState from '../RoomState';
import Calendar from '../RoomCalendar/Calendar';

import './index.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAL-P-RBachsxNXsevyk_24RxWiOIbPlE8",
  authDomain: "roomsbooking-fc246.firebaseapp.com",
  databaseURL: "https://roomsbooking-fc246.firebaseio.com",
  projectId: "roomsbooking-fc246",
  storageBucket: "roomsbooking-fc246.appspot.com",
  messagingSenderId: "170840432036"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: null
    }

    console.log("usuario: ", this.state.user)
  }
  render() {
    return (
      <div>

        {/* <div className="app-calendar">
          <Calendar/>
        </div> */}
       
          {!this.state.user && 
          
           <div className="app-access">
              <div>
               <Register/>
              </div>

              <div>
               <Login/>
              </div>
            </div>
          
          }
        


        <RoomInput/>

        <RoomState/>
        
      </div>
    );
  }
}

export default App;
