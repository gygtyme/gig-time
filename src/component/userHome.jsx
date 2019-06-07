import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
const ms = require('pretty-ms')


class UserHome extends Component {

  state = {

    menuOn: false
  }

  menuToggle = () => {
    this.setState({
      menuOn: !this.state.menuOn
    })
  }
  render() {

    let gigMapped = this.props.gigs.map((gig) => {
      return (

        <div style={{
          border: "solid",
          width: "200px",
          borderRadius: "5px",
          padding: "5px",
          margin: '15px'
        }} key={gig.id} onClick={() => {
          this.props.history.push(`/singlegig/${gig.id}`)
        }}>

          <h2>{gig.title}</h2>
          <p>Desc: {gig.description}</p>
          <p>Time: {gig.total_time}</p>

        </div>

      )
    })




    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}>
        {gigMapped}

        <button onClick={axios.post('/feedback').then(res => console.log(res))}>FIRE</button>

        <div id="circularMenu" class={this.state.menuOn ? 'circular-menu active' : 'circular-menu'}>
          <a class="floating-btn" onClick={this.menuToggle}>
            <i class="fa fa-plus"></i>
          </a>
          <menu class="items-wrapper">
            <a href={"/#/wizard"} class="menu-item ">create</a>
            {/* <a  class="menu-item "></a> */}
            <a href={"/#/gighistory"} class="menu-item ">history</a>
            <a href={"/#/clientlist"} class="menu-item ">clients</a>
          </menu>
        </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)