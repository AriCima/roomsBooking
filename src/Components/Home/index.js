import React, { Component } from 'react';

// COMPONENTS
import AptOverview from '../Apartments/AptOverview';

// CSS
import './index.css';



export default class Home extends React.Component {
  constructor(props){
    super(props);

  };



  render() {
  
    //console.log("render del Home, props:", this.props.userEmailId.id);

    return (
      
      <div className="home">

        <div className="upper-menu">
          <p>{this.props.userEmailId.id}</p>
        </div>

        <div className="overview-panel">

          <p>OverView Panel</p>

          <div className="">
            <AptOverview userEmailId={this.props.userEmailId}/>
          </div>



        </div>

        

      </div>

    );
  };
};

