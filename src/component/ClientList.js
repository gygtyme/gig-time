import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
const ms = require('pretty-ms')


class ClientList extends Component {
  state = {
    list: [],

  }

  async componentDidMount() {

    let clientList = await axios.get('/api/clients')
    console.log(this.state.list)

    this.setState({
      list: clientList.data
    })
  }


  render() {
    console.log(this.state.list)
    let displayArr = this.state.list.map((client) => {
      return <div style={{
        border: "solid",
        width: "200px",
        borderRadius: "5px",
        padding: "5px",
        margin: '15px'
      }} key={client.id} >
        <p>{client.client_first}</p>
        <p>{client.client_last}</p>
        <p>{client.email}</p>
        
      </div>
    })



    return <>
      <div>Client List:{displayArr}</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ClientList)