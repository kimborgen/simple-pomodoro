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
		minutes: defaultMinutes,
		seconds: defaultSeconds,
		state: "stopped"
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

	// check if timer is done
	if (newMinutes <= 0) {
		this.setState({
			state: "finished"
		})
	} else {
		this.setState({
			minutes: newMinutes,
			seconds: newSeconds
		})
	}
  }

  /// stop and reset the timer
  handleDoubleClick = () => {
	this.setState({
		state: "stopped",
		minutes: this.state.defaultMinutes,
		seconds: this.state.defaultSeconds
	})
  }	

  /// active or pause the timer 
  handleSingleClick = (e) => {
	// start the timer
	if (this.state.state === "active") {
		this.setState({
			state: "paused"
		}, this.tick)
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
      <div onClick={this.handleClicks} className="pomodoro">
        <h1 className="pomodoro__timer">{this.timerToString()}</h1>
      </div>
    );
  }
}

export default Pomodoro;
