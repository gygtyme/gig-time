import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateGigs } from '../redux/userReducer'

class TaskWizard extends Component {
  constructor() {
    super()
    this.state = {
      taskTitle: '',
      taskDesc: '',
      gigId: null

    }
  }

  changeHandler = (e) => {
    
    this.setState({
      [e.target.name]: e.target.value
    })

  }
  wizardSubmitHandler = (e) => {
    e.preventDefault()
    const { gig_id } = this.props.match.params
    const {taskTitle, taskDesc} = this.state
    axios.post('/api/tasks/create', {gig_id, taskTitle, taskDesc}).then(res => {
      
      
    })
    this.props.history.push(`/singlegig/${gig_id}`)
  }
  
  goBack = () => {
    const { gig_id } = this.props.match.params
    this.props.history.push(`/singlegig/${gig_id}`)
  }


  render() {
    return (
      <div>
        <form >
          <div>
            <h1>Gig Info</h1>
            <input type="text" onChange={this.changeHandler} required placeholder="Task title" name="taskTitle" />

            <input type="text" onChange={this.changeHandler} required placeholder="Task description" name="taskDesc" />




          </div>


          <button type="submit" onClick={this.wizardSubmitHandler}>Submit</button>
        </form>

          <button onClick={this.goBack}>cancel</button>

      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    reduxState: state
  }
}

const mapDispatchToProps = {
  updateGigs
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskWizard)