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
// let display= await axios.get(`/api/getSingleGig/${this.props.match.params.gig_id}`)
  }

  render() {
    // let gigId= this.props.match.params.gig_id
    // let gigToDisplay= this.props.gigs.find(el=>{
    //     return +el.id===+gigId
    // })

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
            user_id: this.state.displayGig.user_id, 
            gig: this.state.displayGig 
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
