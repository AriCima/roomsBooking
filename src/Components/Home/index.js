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
  

    return (
      
      <div className="home">

        <div className="overview-panel">
          <AptOverview userEmailId={this.props.userEmailId}/>
        </div>

      </div>

    );
  };
};

