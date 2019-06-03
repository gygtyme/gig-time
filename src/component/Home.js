import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import { userInfo } from "../redux/userReducer"
import Navbar from './Navbar'



class Home extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {
    

    axios.get('/getEverything').then((res)=>{
      if(res.data.session.user){
        
        this.props.userInfo(res.data)

        // axios.get('/auth/users').then((res) => {
          
          
        //   this.props.userInfo(res.data)          
          
        // }).catch((err) => { console.log(err) })

      }
    }).catch(err=>console.log('err with navBar CDM', err))

  }

  render() {



    return (
      <div>
this is the home component.

      </div>
    )

  }

}
const mapDispatchToProps = {
  userInfo
}

const mapStateToProps = (reduxState) => {
  const { firstName } = reduxState
  return { firstName }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))