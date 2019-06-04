import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {updateGigs} from '../redux/userReducer'

class GigWizard extends Component {
  constructor() {
    super()
    this.state = {
      gigName: '',
      gigDesc: '',
      rate: 0,
      clientFName: '',
      clientLName: '',
      clientEmail: '',
      clientPhone: 0
    }
  }

  changeHandler = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })

  }
  wizardSubmitHandler = (e) => {
    e.preventDefault()
    
    axios.post('/api/createGig', this.state).then(res => {
      //dispatch to redux store updated gig list
      console.log(res.data, 'froewijafwoi')
      this.props.updateGigs(res.data)
    })
  }


  render() {
    return (
      <div>
        <ul>
          <li>title</li>
          <li>description</li>
          <li>hourly rate</li>
          <li>client email</li>
          <li>client first</li>
          <li>client last</li>
          <li>client phone</li>
        </ul>

        <form >
          <div>
            <h1>Gig Info</h1>
            <input type="text" onChange={this.changeHandler} required placeholder="Gig Name" name="gigName" />

            <input type="text" onChange={this.changeHandler} required placeholder="gig description" name="gigDesc" />


            <input type="number" onChange={this.changeHandler} required placeholder="Hourly Rate" name="rate" />

          </div>


          <div>
            <h1>Client Info</h1>
            <input type="text" onChange={this.changeHandler} required placeholder="Client first Name" name="clientFName" />

            <input type="text" onChange={this.changeHandler} required placeholder="Client Last Name" name="clientLName" />

            <input type="email" onChange={this.changeHandler} required placeholder="client Email" name="clientEmail" />


            <input type="number" onChange={this.changeHandler} required placeholder="Client Phone" name="clientPhone" />

          </div>




          <button type="submit" onClick={this.wizardSubmitHandler}>Submit</button>
        </form>


      </div>
    )
  }

}

const mapStateToProps=(state)=> {
return {
  reduxState: state
}
}

const mapDispatchToProps= {
  updateGigs
}

export default connect(mapStateToProps, mapDispatchToProps)(GigWizard)