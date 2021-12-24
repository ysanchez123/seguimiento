import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="nav nav-tabs">
        <a href="/">
          Home
        </a>
        
        <a href="/protocolo_llamadas">
          protocolo llamadas
        </a>

        <a href="/puntos">
          Puntos
        </a>
      </div>
    );
  };
}