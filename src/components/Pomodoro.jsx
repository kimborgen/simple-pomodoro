import React, { Component } from 'react';
import './pomodoro.css'

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
	this.clickCount = 0;
    this.singleClickTimer = '';
  }

  /// timer to string
  timerToString = () => {
	let str = ""
	/// If minutes is only one digit then prepend another
	if (this.state.minutes < 10) {
		str += "0"
	}
	str += this.state.minutes

	str += ":"

	if (this.state.seconds < 10) {
		str += "0"
	}
	str += this.state.seconds
	return str
  }

  /// update timer every tick
  tick = () => {
	// check if timer is stopped
	if (this.state.state != "active") {
		return
	} else {
		// continue clock
		setTimeout(this.tick, 1000);
	}

	let newMinutes = this.state.minutes
	let newSeconds = this.state.seconds

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


  handleDoubleClick = () => {
	this.setState({
		state: "stopped",
		minutes: this.state.defaultMinutes,
		seconds: this.state.defaultSeconds
	})
  }	

  timerClicked = (e) => {
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

  handleClicks = () => {
  	this.clickCount++;
    if (this.clickCount === 1) {
    	this.singleClickTimer = setTimeout(function() {
       		this.clickCount = 0;
        	this.timerClicked();
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
