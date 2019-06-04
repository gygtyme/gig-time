import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class UserHome extends Component{
  render(){
    return(
      <div>
        User Home! 
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