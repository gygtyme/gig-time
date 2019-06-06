import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const ms = require('pretty-ms')


class UserHome extends Component{
  render(){

    let gigMapped = this.props.gigs.map((gig) => {
      return <div style={{border: "solid",
       width: "200px",
        borderRadius: "5px",
         padding: "5px",
        margin: '15px'
        }} key={gig.id} onClick={()=> {
        this.props.history.push(`/singlegig/${gig.id}`)
      }}>
      <h2>{gig.title}</h2>
      
      <p>Desc: {gig.description}</p>
      <p>Time: {ms(gig.total_time)}</p>


      
</div>
  })    




    return(
      <div style={{
        display:'flex', 
        justifyContent: 'space-around', 
        flexWrap: 'wrap',
      }}>
        User Home!

{gigMapped}

      <Link to='/wizard'>
        <div style={{

          // width: '100px', 

          border: '2px solid black', 
          fontSize: '60px', 
          position: 'absolute', 
          bottom: '20px', 
          right: "20px", 
          borderRadius: '50%',
          textAlign: 'center',
          padding: '15px'
          
        
        }}>+</div>
        </Link>
      </div>
    )
  }
}

const mapStateToProps=(reduxState)=> {
return {
  gigs: reduxState.gigs,
  totalGigTime: reduxState.totalGigTime
}
}

const mapDispatchToProps= {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)