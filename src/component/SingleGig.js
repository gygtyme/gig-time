import React, { Component } from 'react';
import {connect} from "react-redux"
import Axios from 'axios';

import Task from './Task'

class SingleGig extends Component {
    state = {
        client: {}
    }
    componentDidMount(){
        let id = this.getGigClient()
        this.getClient(id)
    }

    getClient = (id) => {
        Axios.post("/api/clients", {id}).then(res => {
            this.setState({
                client: res.data
            })
        })
    }

    getGigClient= () => {
        let gig = this.props.match.params.gig_id
        let id = this.props.gigs.filter(gigs => +gig === +gigs.id)
        console.log(id)
        if(!id[0]){
                return
        }
        let clientId = id[0].client_id
        return clientId
    }
    render() {
        const {client} = this.state
        let gig_id = this.props.match.params.gig_id
        let gig = this.props.gigs.filter(gig => +gig_id === +gig.id)
        gig = gig[0]
        
        let gigDisplay = (this.props.firstName) ?
        <div style={{border: "solid"}}>
        <h2>{gig.title}</h2>
        <p>{client.client_first} {client.client_last}</p>
        <p>{client.client_email} {client.client_phone}</p>
        <p>{gig.description}</p>
        <p>{gig.total_time}</p>
        <p>{gig.project_rate}</p>
        <p>{gig.is_paid}</p>
        <p>{gig.is_billed}</p>
        <div>
            <Task gig={gig}/>
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
    let {gigs, firstName} = state
    return {gigs, firstName}
}

export default connect(mapStateToProps)(SingleGig);