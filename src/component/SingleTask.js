import React, { Component } from 'react';
import { connect } from "react-redux"
import axios from 'axios'
import Timer from './Timer'

class SingleTask extends Component {
  state = {
    toggleView: false,
    targetId: null,
    editToggle: false,
    task_title: null,
    task_desc: null
  }

  handleToggle = (val) => {
    console.log(val)
    this.setState({
      toggleView: !this.state.toggleView,
      targetId: val
    })
  }

  deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`).then(res => {

    })

  }

  editTask = (id) => {
    const { title, description, project_rate } = this.state
    // project_rate = +project_rate
    axios.put(`/api/gigs/${id}`, { title, description, project_rate }).then(() => {

    })
    this.toggleEdit()
  }

  editToggle = () => {
    this.setState({
      editToggle: !this.state.editToggle
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  editTask = (id) => {
    const { task_title, task_desc} = this.state
    
    axios.put(`/api/tasks/${id}`, { task_title, task_desc}).then(() => {

    })
    this.editToggle()
}

  render() {
    console.log(this.props)
    const { task } = this.props

    let taskView = this.state.toggleView && !this.state.editToggle ?
      <div style={{ border: "solid" }} key={task.id}>
        <h4>{task.task_title}</h4>
        <p>{task.task_description}</p>
        <Timer />
        <button onClick={this.handleToggle}>Minimize</button>
      </div>
      : !this.state.toggleView && !this.state.editToggle ?
        <div style={{ border: "solid" }} key={task.id} task_id={task.id}>
          <h4>{task.task_title}</h4>
          <p>{task.task_description}</p>
          <button onClick={this.handleToggle}>Expand</button>
          <button onClick={this.editToggle}>edit task</button>
          <button onClick={() => this.deleteTask(task.id)}>X</button>
        </div>
        : !this.state.toggleView && this.state.editToggle ?
          <div>
            <p>task Title:</p>
            <input onChange={this.handleChange} placeholder={this.state.task_title}
              value={this.state.task_title} name='task_title' />
            <p>task Description:</p>
            <input onChange={this.handleChange} placeholder={this.state.task_desc}
              value={this.state.task_desc} name="task_desc" />
            <button onClick={() => this.editTask(task.id)}>save</button>
          </div>
          : null

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