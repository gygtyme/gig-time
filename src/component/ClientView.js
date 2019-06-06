import React, { Component } from 'react';
import './styles/ClientView.css';
import ProgressBar from './ProgressBar';
import axios from 'axios'
import {connect} from 'react-redux'

class ClientView extends Component {
  constructor() {
    super()

    this.state = {
      feedback:'', 
      displayGig:{}
    }
  }
  async componentDidMount() {
let display= await axios.get(`/api/getSingleGig/${this.props.match.params.gig_id}`)

  this.setState({
    displayGig: display.data
  })


}

  render() {

let {displayGig}=this.state
return(
      <div>
        <div class='progress'>
          <ProgressBar />

      <h1>{displayGig.title}</h1>

        <textarea name="feedback" placeholder='type feedback here!' cols="30" rows="10" onChange={(e)=> {
          this.setState({
            [e.target.name]:e.target.value
          })
        }}></textarea> 
        <button onClick={()=> {


          axios.post('/feedback', {feedback: this.state.feedback,
            // clientId: gigToDisplay.client_id,

            // userId
          })
        }}>Submit Feedback</button>         
        </div>
      </div>
    )
  }
}

const mapStateToProps= (reduxState)=> {
  return reduxState
}

const mapDispatchToProps= {

}

export default connect(mapStateToProps, mapDispatchToProps)(ClientView)
