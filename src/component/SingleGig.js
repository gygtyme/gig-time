import React, { Component } from 'react';
import { connect } from "react-redux"
import axios from 'axios';
import Task from './Task'
import { Link } from 'react-router-dom'
import TaskWizard from './TaskWizard'
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
        is_billed: null
    }
    componentDidMount() {
        let id = this.getGigClient()
        this.getClient(id)
    }

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

        })
        this.props.history.push('/userHome')
    }

    editGig = (id) => {
        const { title, description, project_rate } = this.state
        // project_rate = +project_rate
        axios.put(`/api/gigs/${id}`, { title, description, project_rate}).then(() => {

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

    render() {
        const { client } = this.state
        let gig_id = this.props.match.params.gig_id
        let gig = this.props.gigs.filter(gig => +gig_id === +gig.id)
        gig = gig[0]


        let gigDisplay = (this.props.firstName && !this.state.toggleEdit) ?

            <div style={{ border: "solid" }}>
                <h2>{gig.title}</h2>
                <p>Client name: {client.client_first} {client.client_last}</p>
                <p>Client contact: {client.client_email} {client.client_phone}</p>
                <p>Gig description: {gig.description}</p>
                <p>Total development time: {ms(gig.total_time)}</p>
                <p>Gig rate: ${gig.project_rate}</p>
                <p>Ammount due: ${((gig.total_time / 1000 / 60 / 60) * gig.project_rate).toFixed(2)}</p>
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
                <button onClick={() => this.deleteGig(gig.id)}>delete Gig</button>
                <button onClick={this.toggleEdit}>edit Gig</button>
                <div>
                    <Task gig={gig} />
                    <Link to={`/taskwizard/${gig.id}`}>
                        <div style={{

                            width: '60px',


                            fontSize: '60px',
                            position: 'absolute',
                            bottom: '20px',
                            right: "20px",
                            borderRadius: '100%',
                            textAlign: 'center',
                            padding: '20px',


                        }}><i class="fas fa-plus-circle"></i></div>
                    </Link>
                </div>
            </div> : (this.props.firstName && this.state.toggleEdit) ?
                <div>
                    
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
                   

                </div>
                : null
        return (
            <div>

                {gigDisplay}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let { gigs, firstName } = state
    return { gigs, firstName }
}

export default connect(mapStateToProps)(SingleGig);