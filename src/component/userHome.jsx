import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
class UserHome extends Component{
  render(){

    let gigMapped = this.props.gigs.map((gig) => {
      return <div style={{border: "solid", width: "200px", borderRadius: "5px", padding: "5px"}} key={gig.id} urlMatch={gig.id}>
      <h2>{gig.title}</h2>
      
      <p>Desc: {gig.description}</p>
      <p>Time: {gig.total_time}</p>
      <p>Rate: {gig.project_rate}</p>
      <div>
          <p>Billed: {gig.is_billed}</p>
          <p>Paid: {gig.is_paid}</p>
      </div>

      
</div>
  })    




    return(
      <div>
        User Home!

{gigMapped}

      <Link to='/wizard'>
        <div style={{
          // height: '40px', 
          width: '60px', 
          border: '2px solid black', 
          fontSize: '60px', 
          position: 'absolute', 
          bottom: '20px', 
          right: "20px", 
          borderRadius: '100%',
          textAlign: 'center', 
          padding:'20px'
        
        }}>+</div>
        </Link>
      </div>
    )
  }
}

const mapStateToProps=(reduxState)=> {
return {
  gigs: reduxState.gigs
}
}

const mapDispatchToProps= {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)