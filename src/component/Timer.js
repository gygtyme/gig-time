import React from 'react'
import { toggle, breakTime} from '../Utils/utils_Tiago'
import { connect } from "react-redux"
import { updateGigTime, refreshTotalGigTime, userInfo  } from '../redux/userReducer'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { async } from 'q';
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

  takeBreak = async () => { //tiago unit test here
    
    await this.setState({
      totalTime: breakTime(this.state.totalTime, this.state.time),  //so far it only calculates once you hit break
    })
    await this.setState({
      time: 0,
      
    })
    console.log('this is the total time on state', this.state.totalTime)
    this.props.updateGigTime(this.state.totalTime)
    this.updateGigTime()
    this.props.refreshTotalGigTime()
  }

  saveEdit = async() => {
    await this.setState({
      
      totalTime: +this.state.inputTime * 1000 * 60 //we need to ask for time in minutes from user
    })
    this.props.updateGigTime(this.state.totalTime)
    this.updateGigTime()
    this.props.refreshTotalGigTime()
  }

  updateGigTime = () => {
    const { totalGigTime } = this.props.reduxState
    console.log('this is in updateGigTime', this.props.match.params, totalGigTime, this.props)
    axios.put(`/api/gigtime/${this.props.match.params.gig_id}`, { totalGigTime }).then((res) => {
      this.props.userInfo(res.data)
    })
  }

  editTime = () => { //tiago unit test here
    this.setState({
      editToggle: toggle(this.state.editToggle)
    })

  }

  handleChange = (e) => {
    this.setState({
      inputTime: e.target.value
    })
  }



  render() {
    let editInput = (this.state.editToggle) ? <><input onChange={this.handleChange} />
      <button onClick={this.saveEdit}>save</button></> : null
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
        
        
        {start}
        {resume}
        {stop}
        {reset}
        {takeBreak}
      </div>
    )
  }
}
const mapDispatchToProps = {
  updateGigTime,
  refreshTotalGigTime, 
  userInfo
}
const mapStateToProps = (reduxState) => {

  return {
    reduxState
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Timer))