import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

import './index.css';

class Header extends Component {
   constructor(props){
    super(props);

    this.state = {
        user : this.props.user,
    }

    this.signOut = this.signOut.bind(this);
    // console.log('this.props.user en el constructor del header', this.props.user)
    // console.log('this.state.user en el constructor del header', this.state.user)

   }

    signOut(){   //Esta función informa a FireBase sobre el logout y FB automáticamente ejecuta el onAuthStateChange del App
        firebase.auth().signOut()
            .then(() => {
                alert('See you later !') // Sign-out successful.
            })
            .catch(() => {
                alert("Ups! Seems you'll have to stay longer")// An error happened.
        });
    }

    render() {
        //console.log('props.user en el header', this.props.user)
        //console.log('el this.state.user en render del header: ', this.state.user)
        return (

            <div className="header">

                <div className="header-left">
                    <div className="title">
                     {this.props.user &&   <p>{this.props.user.email}</p>}
                    </div>
                </div>

                <div className="header-mid">

                    <div className="nav-block">
                    {!this.props.user ? <p>RENTAL MANAGEMENT APP</p>
                        :<Link to={`/home/${this.props.user.uid}`}>Home</Link>
                    } 
                    </div>

                    
                </div>

                <div className="header-right">

                    <div className="nav-block">
                        {this.props.user ? 
                            <span onClick={this.signOut}><Link to="/login">Sign-out</Link></span>
                            :
                            <Link to="/login">Sign-In</Link>}
                    </div>

                </div>

            </div>
                            

        );
    }
}
export default Header;
