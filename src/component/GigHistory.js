import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
const ms = require('pretty-ms')


class GigHistory extends Component {
  state = {
    paidGigs : [],
    notPaidGigs : []
  }

  async componentDidMount(){
    let paidItems = await axios.get('/api/paid')
    let notPaid = await axios.get('/api/notpaid')
    
    this.setState({
      paidGigs : paidItems.data,
      notPaidGigs : notPaid.data
    })
  }
  

  render() {
    console.log(this.state.paidGigs)
    let displayArr = this.state.paidGigs.map((gig)=>{
      return  <div style={{
        border: "solid",
        width: "200px",
        borderRadius: "5px",
        padding: "5px",
        margin: '15px'
      }} key={gig.id} onClick={() => {
        this.props.history.push(`/singlegig/${gig.id}`)
      }}>
        <p>{gig.title}</p>
        <p>{gig.description}</p>
        <p>${(gig.total_time * gig.project_rate).toFixed(2)}</p>
      </div>
    })

    let notPaidArr= this.state.notPaidGigs.map((gig)=>{
      return  <div style={{
        border: "solid",
        width: "200px",
        borderRadius: "5px",
        padding: "5px",
        margin: '15px'
      }} key={gig.id} onClick={() => {
        this.props.history.push(`/singlegig/${gig.id}`)
      }}>
        <p>{gig.title}</p>
        <p>{gig.description}</p>
        <p>${(gig.total_time * gig.project_rate).toFixed(2)}</p>
      </div>
    })
    return <>
    <div>Paid Gigs:{displayArr}</div>
    <div>Not Paid gigs: {notPaidArr}</div>
    </>
     
  }
}

const mapStateToProps = (reduxState) => {
  return {
    gigs: reduxState.gigs,
    totalGigTime: reduxState.totalGigTime
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GigHistory)