import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, userInfo } from '../redux/userReducer'
import axios from 'axios'
import HamburgerMenu from './HamburgerMenu'
import './styles/Navbar.css';


class Navbar extends Component {
    constructor() {
        super()
        this.state = {

            open: [false, true, false, true],
            email: '',
            pass: ''
        }
    }
    componentDidMount() {
        axios.get('/api/getsession').then((res) => {
            this.props.userInfo(res.data)
        }).catch((err) => { console.log(err) })
    }

    loginHandler = () => {
        let { email, pass } = this.state

        axios.post('/users/login', { email, pass }).then(res => {
            //update redux store
            // console.log(res.data, 'res data')
            this.props.userInfo(res.data)

            //push to userHomepage


        }).catch(err => console.log('login error', err))
        this.props.history.push('/userHome')
    }

    logoutHandler = () => {
        axios.delete('/users/logout').then(() => {
            // console.log('user Logged Out')
        }).catch(err => console.log(err, 'logout issue'))
        this.props.history.push('/')
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (id) => {
        let { open } = this.state;
        this.setState({
            open: [...open.slice(0, id), !open[id], ...open.slice(id + 1)]
        });
    }

    render() {
        const { firstName } = this.props.prop
        return (
            <nav className='navbar'>
                <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                    <span className="app_name_container">GIG Time</span>
                </Link>
                {firstName && <div>Welcome, {firstName}  <button className="logout_button" onClick={() => {
                    this.props.logout()
                    axios.delete('/users/logout').then(() => { this.props.history.push('/') })
                }}>logout</button></div>}
                {!firstName ? (
                    <div>
                        <div className='loginJacob'>
                            Email <input  className="newTask" autoFocus type="email"
                                name="email" placeholder="email" required onChange={e => {
                                    this.changeHandler(e)
                                }} />
                            Password <input type="password"
                                name="pass" placeholder="password" required onChange={(e) => {
                                    this.changeHandler(e)
                                }} /> 
                            <button onClick={this.loginHandler}>Login</button>
                            <Link to='/register' style={{ 'textDecoration': 'none' }}> <button> Register </button> </Link>
                        </div>
                    </div>
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
    userInfo,

}
const mapStateToProps = (reduxState) => {

    return {
        prop: reduxState
    }

    // const { firstName } = reduxState
    // return { firstName }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))