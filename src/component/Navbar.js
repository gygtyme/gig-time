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
            this.props.history.push('/userHome')


        }).catch(err => console.log('login error', err))
    }

    logoutHandler = () => {
        axios.delete('/users/logout').then(() => {
            // console.log('user Logged Out')
            this.props.history.push('/')
        }).catch(err => console.log(err, 'logout issue'))
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
                {/* <div className="app_name_logout_container"> */}
                    <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
                        <span className="app_name_container">GIG Time</span>
                    </Link>
                    {firstName && <div>Welcome, {firstName}  <button className="logout_button" onClick={() => {
                        this.props.logout()
                        axios.get('/auth/logout').then(() => { this.props.history.push('/home') })
                    }}>logout</button></div>}
                {/* </div> */}
                {!firstName ? (
                    <div>
                        <div className='loginJacob'>
                            email <input  className="newTask" autoFocus type="email"
                                name="email" placeholder="email" required onChange={e => {
                                    this.changeHandler(e)
                                }} />
                            Password <input type="password"
                                name="pass" placeholder="password" required onChange={(e) => {
                                    this.changeHandler(e)
                                }} />
                            <button onClick={this.loginHandler}>Login</button>
                            <Link to='/register' style={{ 'text-decoration': 'none' }}> <button> Register </button> </Link>
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