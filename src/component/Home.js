import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import { userInfo } from "../redux/userReducer"




class Home extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {
    axios.get('/auth/users').then((res) => {
      this.props.userInfo(res.data)
    }).catch((err) => { console.log(err) })
  }

  render() {



    return (
      <div>
        <h1>text holder</h1>

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