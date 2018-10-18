import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


// APP COMPONENTS
import Header from '../Header';
import Register from '../Access/Register';
import Login from '../Access/Login';
import Home from '../Home';
import Apartment from '../Apartments/Apt';
import AptBookings from '../Apartments/AptBookings'
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

  }


  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        this.setState({user : user});

        console.log('El user en el state del App: ', this.state.user)
        // DataService.getUserContactInfo(user.uid).then(
        //   (userData)=>{
        //     //console.log('userData en App: ', userData);
        //     userData.id = user.uid;
        //     this.setState({user : userData});
        //     //console.log('El user luego del setState en App:', user)
        //   }, 
        //   (errorMessage)=>{
        //     console.log(errorMessage)
        //   }
        // )
      
      } else {
        this.setState({
          user : null
        });
      }
    });
    
  }

  render() {
    const { user } = this.state;
    //console.log('el user en App render: ', user)
    return (
      <div>

        <Router>

          <div className="app">
          
            <div className="app-header">
            <Header user={user} />}
            </div>
        
            <div className="app-body">

              <Switch>
                {/* <Route path="/landing" render = {(props) => {return <Login propsFn={props.history}/>}}/> */}
                <Route path="/login" render = {(props) => {return <Login propsFn={props.history}/>}}/>
                <Route path="/register" component={Register}/>

                {/* <Route path="/home" render = {(props) => { return <Home userEmailId={user}/>}}/> */}
                <Route path="/home/:user" render = {(props) => { return <Home userID={props.match.params.user}/>}}/>
                <Route path="/single_apt_overview/:aptId" exact render = {(props) => { return <Apartment aptID={props.match.params.aptId} userData={user}/> }}/> 
                <Route path="/apt_add/:user" exact render = {(props) => { return <ApartmentInput propsFn={props.history} userID={props.match.params.user}/> }}/> 
                <Route path="/apt_addRoom/:aptCode" exact render = {(props) => { return <RoomInput propsFn={props.history} userEmailId={user} aptID={props.match.params.aptCode}/> }}/> 
                <Route path="/apt_newbooking/:aptId" exact render = {(props) => { return <AptBookings propsFn={props.history} userData={user} aptID={props.match.params.aptId}/> }}/> 
                
                <Route path="/single_room_overview/:roomId" exact render = {(props) => {return <Room roomID={props.match.params.roomId}/> }}/>
                <Route path="/room_newbooking/:roomId" exact render = {(props) => {return <RoomBookings propsFn={props.history} userData={user} roomID={props.match.params.roomId}/> }}/>
                
              </Switch>


            </div>

          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
