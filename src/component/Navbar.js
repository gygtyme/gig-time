import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, userInfo } from '../redux/userReducer'
import axios from 'axios'
import HamburgerMenu from './HamburgerMenu'


class Navbar extends Component {
    constructor() {
        super()
        this.state = {

            open: [false, true, false, true]

        }
    }
    componentDidMount(){
        axios.get('/api/gigs').then((res)=>{
            this.props.userInfo(res.data)
        }).catch((err) => { console.log(err) })    
    }

    handleClick(id) {
        let { open } = this.state;
        this.setState({
            open: [...open.slice(0, id), !open[id], ...open.slice(id + 1)]
        });
    }

    render() {
        const { firstName } = this.props
        return (

            <nav>
                <div className="app_name_logout_container">
                    <span className="app_name_container">GIG Time</span>
                    
                    {firstName && <div>Welcome, {firstName}  <button className="logout_button" onClick={() => {
                        this.props.logout()
                        axios.get('/auth/logout').then(() => { this.props.history.push('/home') })


                    }}>logout</button></div>}
                </div>

                {!this.props.username ? (
                    <ul className="login_register_container">
                        <li className="login_container">
                            <Link to='/login' className="login_text">Login</Link>
                        </li>
                        <li className="register_container">
                            <Link to='/register' className="register_text">Get Started</Link>
                        </li>
                    </ul>
                ) : (
                        <div className="menu_logout_container">
                            <HamburgerMenu />

                        </div>
                    )}



            </nav>
        )
    }
}
const mapDispatchToProps = {
    logout,
    userInfo
}
const mapStateToProps = (reduxState) => {
    const { firstName } = reduxState
    return { firstName }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))