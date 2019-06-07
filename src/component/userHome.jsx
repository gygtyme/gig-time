import React, { Component } from 'react'
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
        
        <div className='gig_card_container' key={gig.id} onClick={() => {
          this.props.history.push(`/singlegig/${gig.id}`)
        }}>

          <p className="card_title">{gig.title}</p>
          <p>Desc: {gig.description}</p>
          <p>Time: {ms(gig.total_time)}</p>

        </div>

      )
    })




    return (
      <div  className="user_home_main_container">
        {gigMapped}

        <div id="circularMenu" class={this.state.menuOn ? 'circular-menu active' : 'circular-menu'}>
          <a class="floating-btn" onClick={this.menuToggle}>
            <i class="fa fa-plus"></i>
          </a>
          <menu class="items-wrapper">
            <a href={"/#/wizard"} class="menu-item ">create</a>
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