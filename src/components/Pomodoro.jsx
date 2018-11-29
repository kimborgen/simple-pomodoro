import React, { Component } from 'react';
import './pomodoro.css'

class Pomodoro extends Component {
  render() {
    return (
      <div className="pomodoro">
        <h1 className="pomodoro__timer">25:00</h1>
      </div>
    );
  }
}

export default Pomodoro;
