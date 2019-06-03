import React, {Component} from "react"
import axios from "axios"
import {connect} from "react-redux"
import Timer from './Timer'

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
        let gigMapped = this.state.gigs.map((gig) => {
            return <div style={{border: "solid", width: "200px", borderRadius: "5px", padding: "5px"}} key={gig.id}>
            <h2>{gig.title}</h2>
            <p>Desc: {gig.description}</p>
            <p>Time: {gig.total_time}</p>
            <p>Rate: {gig.project_rate}</p>
            <div>
                <p>Billed: {gig.is_billed}</p>
                <p>Paid: {gig.is_paid}</p>
            </div>
            {gig.tasks.map((task) => {
                return <div key={task.id}>Task Title: {task.task_title} <b />
                 <Timer /></div>
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
