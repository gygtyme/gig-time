import React, { Component } from 'react';
import { connect } from "react-redux"
import axios from 'axios';
import Task from './Task'
<<<<<<< HEAD
import { Link } from 'react-router-dom'
import TaskWizard from './TaskWizard'
=======
// import { Link } from 'react-router-dom'
import Switch from 'react-switch'
import { userInfo} from '../redux/userReducer'

// import TaskWizard from './TaskWizard'
>>>>>>> master
const ms = require('pretty-ms')


class SingleGig extends Component {
    state = {
        client: {},
        amountDue: 0,
        toggleEdit: false,
        title: null,
        description: null,
        project_rate: 0,
        is_paid: null,
        is_billed: null,
        menuOn: false
    }


    componentDidMount () {
        console.log(this.props)
        let id = this.getGigClient()
        this.getClient(id)
        // this.reduxCollector() //going to fix it tomorrow
    }
    
    // reduxCollector = () =>{
        
    //      this.setState({
    //         is_billed : this.props.gigs[0].is_billed,
    //         is_paid : this.props.gigs[0].is_paid
    //     })
    // }

    getClient = (id) => {
        axios.post("/api/clients", { id }).then(res => {
            this.setState({
                client: res.data
            })
        })
    }

    getGigClient = () => {
        let gig = this.props.match.params.gig_id
        let id = this.props.gigs.filter(gigs => +gig === +gigs.id)
        console.log(id)
        if (!id[0]) {
            return
        }
        let clientId = id[0].client_id
        return clientId
    }

    deleteGig = (id) => {
        axios.delete(`/api/gigs/${id}`).then(res => {
            this.props.userInfo(res.data)
        })
        this.props.history.push('/userHome')
    }

<<<<<<< HEAD
    editGig = (id) => {
        const { title, description, project_rate } = this.state
        // project_rate = +project_rate
        axios.put(`/api/gigs/${id}`, { title, description, project_rate}).then(() => {

=======
    sendUpdateToClientHandler = (firstName, clientEmail, gig_id) => {
        console.log(firstName, clientEmail, gig_id)
        axios.post(`/update/${gig_id}`, { firstName, clientEmail }).then(res => {

        }).catch(err => {
            console.log(err)
        })
    }

    editGig = (id) => {
        const { title, description, project_rate } = this.state
        // project_rate = +project_rate
        axios.put(`/api/gigs/${id}`, { title, description, project_rate }).then((res) => {
            this.props.userInfo(res.data)
>>>>>>> master
        })
        this.toggleEdit()
    }

    toggleEdit = () => {
        this.setState({
            toggleEdit: !this.state.toggleEdit
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

<<<<<<< HEAD
=======
    handlePaidSwitch = () => {
        this.setState({
            is_paid: !this.state.is_paid
        })
        this.saveToDB()
    }

    saveToDB = async() => {
        console.log('look at me', 'bille:',this.state.is_billed, 'paid:', this.state.is_paid)
        const { gig_id: id } = this.props.match.params
        const { is_paid, is_billed } = this.state
        await axios.put(`/api/gig/paid/${id}`, { is_paid })
        
        await axios.put(`/api/gig/billed/${id}`, { is_billed })
    }

    handleBilledSwitch = () => {
        this.setState({
            is_billed: !this.state.is_billed
        })
        this.saveToDB()
    }

    menuToggle = () => {
        this.setState({
            menuOn: !this.state.menuOn
        })
    }

    billThem = () => {
        let gig_id = this.props.match.params.gig_id
        axios.post(`/billGig/${gig_id}`, {
            total: this.state.amountDue,

        }).then((res) => {

            this.props.history.push('/userHome')
            alert('your email has been sent to the client!')
        }
        ).catch(err => console.log(err, 'frontendError'))
    }

>>>>>>> master
    render() {
        const { client } = this.state
        let gig_id = this.props.match.params.gig_id
        let gig = this.props.gigs.filter(gig => +gig_id === +gig.id)
        gig = gig[0]


        let gigDisplay = (this.props.firstName && !this.state.toggleEdit) ?

            <div className="gig_card_container" >
                <h2>{gig.title}</h2>
                <p>Client name: {client.client_first} {client.client_last}</p>
                <p>Client contact: {client.client_email} {client.client_phone}</p>
                <p>Gig description: {gig.description}</p>
                <p>Total development time: {ms(gig.total_time)}</p>
                <p>Gig rate: ${gig.project_rate}</p>
                <p>Ammount due: ${((gig.total_time / 1000 / 60 / 60) * gig.project_rate).toFixed(2)}</p>
<<<<<<< HEAD
                <p>{gig.is_paid}</p>
                <p>{gig.is_billed}</p>
                <button onClick={() => {
                    axios.post(`/billGig/${gig_id}`, {
                        total: this.state.amountDue,

                    }).then((res) => {

                        this.props.history.push('/userHome')
                        alert('your email has been sent to the client!')
                    }
                    ).catch(err => console.log(err, 'frontendError'))
                }}>Bill This Gig </button>
              
                <button onClick={this.toggleEdit}>edit Gig</button>
                <button onClick={()=>this.deleteGig(gig.id)}>delete Gig</button>
{/* 

    this is for later- to send the update to the client when requested. 
                <button onClick={()=> {
                    axios.post('/update')
                }}>Send Update To Client</button> */}
=======
                <p>Paid:{gig.is_paid} <Switch checked={this.state.is_paid} onChange={this.handlePaidSwitch}></Switch></p>
                <p>Billed: {gig.is_billed} <Switch value={this.state.is_billed} checked={this.state.is_billed} onChange={this.handleBilledSwitch}></Switch></p>


                <div className="button_task_container">
                    <button onClick={() => {
                        this.sendUpdateToClientHandler(client.client_first, client.client_email, gig_id)
                    }}>Send Update To Client </button>
                </div>

>>>>>>> master

                <div>
                    <Task gig={gig} />


                    <div id="circularMenu" class={this.state.menuOn ? 'circular-menu active' : 'circular-menu'}>
                        <div class="floating-btn" onClick={this.menuToggle}>
                            <i class="fa fa-plus"></i>
                        </div>
                        <menu class="items-wrapper">
                            <a href={"/#/taskwizard/" + gig_id} class="menu-item ">create</a>
                            <div onClick={() => this.deleteGig(gig.id)} class="menu-item ">delete</div>
                            <div onClick={this.toggleEdit} class="menu-item ">edit</div>
                            <div onClick={this.billThem} class="menu-item">bill</div>
                        </menu>
                    </div>


                </div>

            </div> : (this.props.firstName && this.state.toggleEdit) ?
                <div>
<<<<<<< HEAD
                    
                    <p>Gig Title:</p>
                    <input onChange={this.handleChange} placeholder={this.state.title}
                    value={this.state.title} name='title'/>
                    <p>Gig Description:</p>
                    <input onChange={this.handleChange} placeholder={this.state.description}
                    value={this.state.description} name="description" />
                    <p>Gig rate:</p>
                    <input onChange={this.handleChange} placeholder={this.state.project_rate}
                    value={this.state.project_rate} name='project_rate'/>
                    <button onClick={()=>this.editGig(gig.id)}>save</button>
                   
=======

                    <p className="sub_header">Gig Title:</p>
                    <input className="input_task_container" onChange={this.handleChange} placeholder={this.state.title}
                        value={this.state.title} name='title' />
                    <p className="sub_header">Gig Description:</p>
                    <input className="input_task_container" onChange={this.handleChange} placeholder={this.state.description}
                        value={this.state.description} name="description" />
                    <p className="sub_header">Gig rate:</p>
                    <input className="input_task_container" onChange={this.handleChange} placeholder={this.state.project_rate}
                        value={this.state.project_rate} name='project_rate' />
                    <div className="button_task_container">
                        <button onClick={() => this.editGig(gig.id)}>save</button>
                    </div>
>>>>>>> master

                </div>
                : null
        return (
            <div className="gigDisplay_container">

                {gigDisplay}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let { gigs, firstName } = state
    return { gigs, firstName }
}

const mapDispatchToProps = {
    userInfo
  }

export default connect(mapStateToProps, mapDispatchToProps)(SingleGig);