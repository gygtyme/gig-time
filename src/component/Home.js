import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

// import axios from 'axios';
// import { updateUsername } from "../redux/auth_reducer"




export default class Home extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  // componentDidMount() {
  //   axios.get('/auth/users').then((res) => {
  //     this.props.updateUsername(res.data.username)
  //   }).catch((err) => { console.log(err) })
  // }

  render() {



    return (
      <div>
        <h1>text holder</h1>

      </div>
    )

  }

}
// const mapDispatchToProps = {
//   updateUsername
// }

// const mapStateToProps = (reduxState) => {
//   const { username } = reduxState
//   return { username }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))