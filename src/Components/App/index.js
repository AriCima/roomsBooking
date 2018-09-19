import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


// APP COMPONENTS
import Header from '../Header';
import Register from '../Access/Register';
import Login from '../Access/Login';
import Home from '../Home';
import Apartment from '../Apartments/Apt';
import Room from '../Rooms/Room';
import RoomInput from '../Rooms/RoomInput';
import RoomBookings from '../Rooms/RoomBookings';
import ApartmentInput from '../Apartments/AptInput';

// API SERVICES
import DataService from '../services/DataService';

// CSS
import './index.css';

// FIREBASE
import * as firebase from 'firebase';


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

    // console.log("usuario: ", this.state.user)
  }


  componentWillMount(){

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('El user recibido de Auth es: ', user)

        DataService.getUserContactInfo(user.uid).then(
          (userData)=>{
            console.log('userData en App: ', userData);
            userData.id = user.uid;
            this.setState({user : userData});
            console.log('El user luego del setState en App:', user)
          }, 
          (errorMessage)=>{
            console.log(errorMessage)
          }
        )
      
      } else {
        this.setState({
          user : null
        });
      }
    });
  }

  render() {
    const { user } = this.state;
    // console.log('el user en App render: ', user)
    return (
      <div>

        <Router>

          <div className="app">
          
            <div className="app-header">
              <Header user={user} />
            </div>
        
            <div className="app-body">

              <Switch>
                <Route path="/landing" component={Login}/>
                <Route path="/" exact component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/home" render = {(props) => { return <Home userEmailId={user}/>}}/>
                {/* <Route path="/apt_overview/:s" exact render = {(props) => {return <Home userEmailId={user} apartmentName={props.match.params.s}/>}}/> */}
                <Route path="/single_apt_overview/:aptId" exact render = {(props) => { return <Apartment aptID={props.match.params.aptId}/> }}/> 
                <Route path="/apt_add/:user" exact render = {(props) => { return <ApartmentInput userID={props.match.params.user}/> }}/> 
                {/* <Route path="/apt_add/:user" component={ApartmentInput}/> */}
                <Route path="/room_overview/:room" exact render = {(props) => {return <Room roomID={props.match.params.room}/> }}/>
                <Route path="/room_booking/:room" exact render = {(props) => {return <RoomBookings roomID={props.match.params.room}/> }}/>
                {/* <Route path="/add-jam" exact render = {(props) => {return <ApartmentInput userEmailId={user}/>}}/> */}
                <Route path="/add-room" exact render = {(props) => {return <RoomInput userEmailId={user}/>}}/>
                {/* <Route path="/bookings" exact render = {(props) => {return <RoomState userEmailId={user} />}}/> */}
              </Switch>


            </div>

          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
