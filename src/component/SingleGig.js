import React, { Component } from 'react';
import { connect } from "react-redux"
import Axios from 'axios';
import Task from './Task'
const ms = require('pretty-ms')


class SingleGig extends Component {
    state = {
        client: {},
        amountDue: 0
    }
    componentDidMount() {
        let gig = this.props.match.params.gig_id
        let id = gig.client_id
        this.getClient(id)
    }

    getClient = (id) => {
        Axios.post("/api/clients", { id }).then(res => {
            this.setState({
                client: res.data
            })
        })
    }

    
    render() {
        const { client } = this.state
        let gig_id = this.props.match.params.gig_id
        let gig = this.props.gigs.filter(gig => +gig_id === +gig.id)
        gig = gig[0]
        console.log('look it here', gig)
        let gigDisplay = (this.props.firstName) ?
            <div style={{ border: "solid" }}>
                <h2>{gig.title}</h2>
                <p>Client name: {client.client_first} {client.client_last}</p>
                <p>Client contact: {client.client_email} {client.client_phone}</p>
                <p>Gig description: {gig.description}</p>
                <p>Total development time: {ms(gig.total_time)}</p>
                <p>Gig rate: ${gig.project_rate.toFixed(2)}</p>
                <p>Ammount due: ${((gig.total_time /1000/60/60)*gig.project_rate).toFixed(2)}</p>
                <p>{gig.is_paid}</p>
                <p>{gig.is_billed}</p>
                
                <div>
                    <Task gig={gig} />
                </div>
            </div> : null
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