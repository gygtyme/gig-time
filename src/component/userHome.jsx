import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
const ms = require('pretty-ms')


class UserHome extends Component {
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
        User Home!

{gigMapped}

<button onClick={axios.post('/feedback').then(res=>console.log(res))}>FIRE</button>

      <Link to='/wizard'>
        <div style={{

            width: '60px',

            border: '2px solid black',
            fontSize: '60px',
            position: 'absolute',
            bottom: '20px',
            right: "20px",
            borderRadius: '100%',
            textAlign: 'center',
            padding: '20px',


          }}>+</div>
        </Link>
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