import React, { Component } from 'react';
import './App.css';
import Pomodoro from './components/Pomodoro.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pomodoro />
      </div>
    );
  }
}

export default App;
