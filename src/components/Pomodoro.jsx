import React, { Component } from 'react';
import './pomodoro.css'

/// Main class
class Pomodoro extends Component {
  constructor(props) {
    super(props);
	  let defaultMinutes= 25;
    let defaultSeconds= 0;
    this.state = ({
		  defaultMinutes,
      defaultSeconds,
      defaultPauseMinutes: 5,
      defaultPauseSeconds: 0,
		  minutes: defaultMinutes,
		  seconds: defaultSeconds,
      state: "paused",
      className: "pomodoro",
    })

    // variables used in to detect doubleClick
	  this.clickCount = 0;
    this.singleClickTimer = '';
  }

  /// timer variables to string
  timerToString = () => {
	  let str = ""
	  // If minutes is only one digit then prepend a 0
	  if (this.state.minutes < 10) {
	  	str += "0"
	  }
	  str += this.state.minutes

	  str += ":"

    // If seconds is only one digit then prepend a 0 
	  if (this.state.seconds < 10) {
		  str += "0"
	  }
	  str += this.state.seconds
	  return str
  }

  /// update timer every tick
  tick = () => {
	  // check if timer is stopped or paused
	  if (this.state.state != "active") {
      // if it is then do not execute further, thus stopping the clock
		  return
	  } else {
		  // continue clock
		  setTimeout(this.tick, 1000);
	  }

	  let newMinutes = this.state.minutes
	  let newSeconds = this.state.seconds

    // if seconds are moving below 0 then wrap to 59 and decrese minutes
	  if (this.state.seconds === 0) {
		  newMinutes--
		  newSeconds = 59
	  } else {
		  newSeconds--
	  }	
    
    this.setState({
      minutes: newMinutes,
      seconds: newSeconds
    })

	  // check if timer is done
	  if (newMinutes <= 0 && newSeconds <= 0) {
		  this.setState({
			  state: "stopped"
      }, this.notifyOs)
      this.startAnimation()
  	}
  }

  /// send out native system notification
  notifyOs = () => {
    let newNotification = new Notification('Simple Pomodor', { body: 'Timer is done!' })
  }

  /// start animation on timer
  startAnimation = () => {
    this.setState({
      className: "pomodoro pomodoro__done"
    })
  }

  /// reset animation on timer
  resetAnimation = () => { 
    this.setState({
      className: "pomodoro"
    })
  }

  
  /// stop and reset the timer
  handleDoubleClick = () => {
    // check if we double click when it is allready reset
    if (this.state.minutes == this.state.defaultMinutes &&
      this.state.seconds == this.state.defaultSeconds) {
      this.setState({ 
        state: "paused",
        minutes: this.state.defaultPauseMinutes,
        seconds: this.state.defaultPauseSeconds,
      })
    } else { 
      this.setState({
        state: "paused",
        minutes: this.state.defaultMinutes,
        seconds: this.state.defaultSeconds
      })
    }
    this.resetAnimation()
  }	

  /// active or pause the timer 
  handleSingleClick = (e) => {
    // start the timer
    if (this.state.state === "active") {
      this.setState({
        state: "paused"
      })
    } else if (this.state.state === "stopped") {
      this.setState({
        state: "active",
        minutes: this.state.defaultPauseMinutes,
        seconds: this.state.defaultPauseSeconds
      }, this.tick)
      this.resetAnimation()
    } else {	
      this.setState({
        state: "active"
      }, this.tick)
    }
  }

  // Detects double clicks, execs handleSingleClick or handleDoubleClick
  handleClicks = () => {
  	this.clickCount++;
    if (this.clickCount === 1) {
    	this.singleClickTimer = setTimeout(function() {
     	  this.clickCount = 0;
        this.handleSingleClick();
      }.bind(this), 300);
    } else if (this.clickCount === 2) {
	    clearTimeout(this.singleClickTimer);
      this.clickCount = 0;
      this.handleDoubleClick();
    }
  }

  render() {
    return (
      <div onClick={this.handleClicks} className={this.state.className}>
        <h1 className="pomodoro__timer">{this.timerToString()}</h1>
      </div>
    );
  }
}

export default Pomodoro;
