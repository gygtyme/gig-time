import React, { Component } from 'react';
import {connect} from "react-redux"
import Axios from 'axios';
import Timer from "./Timer"

class SingleGig extends Component {
    state = {
        client: {}
    }
    componentDidMount(){
        let gig = this.props.match.params.gig_id
        let id = gig.client_id
        this.getClient(id)
    }

    getClient = (id) => {
        Axios.post("/api/clients", {id}).then(res => {
            this.setState({
                client: res.data
            })
        })
    }
    render() {
        const {client} = this.state
        let gig_id = this.props.match.params.gig_id
        let gig = this.props.gigs.filter(gig => +gig_id === +gig.id)
        gig = gig[0]
        console.log(gig)
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
            {gig.tasks.map((task) => 
                <div key={task.id}>
                    <h4>{task.task_title}</h4>
                    <p>{task.task_description}</p>
                    <Timer />
                </div>
            )}
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