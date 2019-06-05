import React, { Component } from 'react';
import { connect } from "react-redux"

import Timer from './Timer'

class SingleTask extends Component {
  state = {
    toggleView: false,
    targetId: null
  }

  handleToggle = (val) => {
    console.log(val)
    this.setState({
      toggleView: !this.state.toggleView,
      targetId: val
    })
  }

  render() {
    console.log(this.props)
    const { task } = this.props
    let taskView = this.state.toggleView ?
      <div style={{ border: "solid" }} key={task.id}>
        <h4>{task.task_title}</h4>
        <p>{task.task_description}</p>
        <Timer />
        <button onClick={this.handleToggle}>Minimize</button>
      </div>
           : 
        <div style={{ border: "solid" }} key={task.id} task_id={task.id}
          onClick={this.handleToggle}>
          <h4>{task.task_title}</h4>
          <p>{task.task_description}</p>
          <button onClick={this.handleToggle}>Expand</button>
        </div>
      

    return (
      <div >
        {taskView}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { gigs } = state
  return { gigs }
}

export default connect(mapStateToProps)(SingleTask);