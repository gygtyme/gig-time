import React, {Component} from "react"
import axios from "axios"
import {connect} from "react-redux"

class Gig extends Component{
    constructor(){
        super()
        this.state = {
            gigs: [{title:"racoon cooking", description:"cooking the racoon", total_time: 225, project_rate: 15, is_paid: "false", is_billed: "true", tasks: [
                {task_title: "find racoon"},
                {task_title: "kill racoon"},
                {task_title: "eat racoon"}
            ]}]
        }
    }   
    render(){
        console.log(this.state.gigs)
        let gigMapped = this.state.gigs.map((gig) => {
            return <div style={{border: "solid", width: "200px", borderRadius: "5px"}} key={gig.id}>
            
            <h3>{gig.title}</h3>
            <p>{gig.description}</p>
            <p>{gig.total_time}</p>
            <p>{gig.project_rate}</p>
            <p>{gig.is_billed}</p>
            <p>{gig.is_paid}</p>
            
            {gig.tasks.map((task) => {
                return <div key={task.id}>{task.task_title}</div>
            })}
            </div>
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
