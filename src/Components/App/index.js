import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// APP COMPONENTS
import Header from '../Header';
import Register from '../Access/Register';
import Login from '../Access/Login';
import RoomsOverview from '../RoomsOverview';
import RoomInput from '../RoomsOverview/RoomInput';
import Room from '../RoomsOverview/Room';

// API SERVICES
import DataService from '../services/DataService';
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

    console.log("usuario: ", this.state.user)
  }


  componentDidMount(){

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
    console.log('el user dentro del render: ', user)
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
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/overview" exact render = {(props) => {return <RoomsOverview userEmailId={user}/>}}/>
                <Route path="/add-room" exact render = {(props) => {return <RoomInput userEmailId={user}/>}}/>
                <Route path="/room-admin/:roomNr" exact render = {(props) => {return <Room userEmailId={user} roomNr={this.props.match.params.roomNr}/>}}/>
              </Switch>


            </div>

          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
