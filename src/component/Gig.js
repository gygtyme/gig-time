import React, {Component} from "react"
import axios from "axios"
import {connect} from "react-redux"

class Gig extends Component{
    constructor(){
        super()
        this.state = {
            gigs: this.props.gigs
        }
    }   
    render(){
        let gigMapped = this.state.gigs.map((gig) => {
            return <div key={gig.id}>{gig.title}</div>
        })
        return(
            <div>
                {gigMapped}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {gigs} = state
    return {gigs}
}

export default connect(mapStateToProps)(Gig)
