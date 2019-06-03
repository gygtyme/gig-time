import React from 'react'
import {toggle} from '../Utils/utils_Tiago'
const ms = require('pretty-ms')

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      start: 0,
      isOn: false,
      totalTime: 0,
      payMe: 0,
      editToggle: false,
      inputTime: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.setState({ isOn: false })
    clearInterval(this.timer)

  }



  resetTimer() {
    this.setState({ time: 0 })
  }

  takeBreak = () => {
    this.setState({
      totalTime: this.state.totalTime + this.state.time,  //so far it only calculates once you hit break
    })
    this.setState({
      time : 0,
      payMe : (this.state.totalTime/1000/60/60) * 60 //here is where you pass in rate
    })
    
  }

  editTime=()=>{
    this.setState({
      editToggle : toggle(this.state.editToggle)
    })
  }

  handleChange = (e) => {
    this.setState({
      inputTime : e.target.value
    })
  }

  saveEdit = () => {
    this.setState({
      totalTime : this.state.inputTime * 1000 * 60 //we need to ask for time in minutes from user
    })
  }

  render() {
    let editInput = (this.state.editToggle) ? <><input onChange={this.handleChange}/>
    <button onClick = {this.saveEdit}>save</button></> : null
    let start = (this.state.time == 0) ?
      <><button onClick={this.startTimer}>start</button> 
      <button onClick={this.editTime}>edit time</button>
      {editInput}
      </> :
      null
    let stop = (this.state.isOn) ?
      <button onClick={this.stopTimer}>stop</button> :
      null
    let reset = (this.state.time != 0 && !this.state.isOn) ?
      <button onClick={this.resetTimer}>reset</button> :
      null
    let resume = (this.state.time != 0 && !this.state.isOn) ?
      <button onClick={this.startTimer}>resume</button> :
      null
    let takeBreak = (this.state.time != 0 && !this.state.isOn) ?
      <button onClick={this.takeBreak}>break</button> :
      null
    return (
      <div>
        <h3 className="countdown">timer: {ms(this.state.time)}</h3>
        <h2>total time spend on task: {ms(this.state.totalTime)}</h2>
        <h4> You owe me: ${this.state.payMe.toFixed(2)}</h4>
        {start}
        {resume}
        {stop}
        {reset}
        {takeBreak}
      </div>
    )
  }
}
export default Timer