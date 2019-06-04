import React, { Component } from 'react';
import {connect} from "react-redux"
import Axios from 'axios';

class Task extends Component {
    state = {
        
    }
    

    
    render() {
      console.log('here is props', this.props)
        let gig_id = this.props.match.params.gig_id
        let gig = this.props.gigs.filter(gig => +gig_id === +gig.id)
        gig = gig[0]
        let gigDisplay = 
        <div style={{border: "solid"}}>
        <h2>{gig.title}</h2>
        
        <p>{gig.description}</p>
        <p>{gig.total_time}</p>
        <p>{gig.project_rate}</p>
        <p>{gig.is_paid}</p>
        <p>{gig.is_billed}</p>
        </div>
        return (
            <div>
                {gigDisplay}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let {gigs} = state
    return {gigs}
}

export default connect(mapStateToProps)(Task);