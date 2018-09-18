import React, { Component } from 'react';

// COMPONENTS
import AptOverview from '../Apartments/AptOverview';

// CSS
import './index.css';



export default class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user : this.props.userId,
    }
  };

  render() {

    console.log("render del Home, props:", this.props)

    return (
      
      <div className="home">

        <div className="upper-menu">
          <p>{this.props.user.userId}</p>
        </div>

        <div className="overview-panel">

          <p>OverView Panel</p>

          <div className="">
            <AptOverview user={this.props}/>
          </div>



        </div>

        

      </div>

    );
  };
};

