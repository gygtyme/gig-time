import React, { Component } from 'react';
import { connect } from "react-redux"
import Axios from 'axios';
import Timer from './Timer'

class Task extends Component {
    state = {
        toggleView: false
    }

    handleToggle = () => {
        this.setState({
            toggleView: !this.state.toggleView
        })
    }

    render() {

        let taskView = this.state.toggleView ?
            this.props.gig.tasks.map((task) =>
                <div style={{ border: "solid" }} key={task.id}
                    onClick={this.handleToggle}>
                    <h4>{task.task_title}</h4>
                    <p>{task.task_description}</p>
                    <Timer />
                </div>
            ) : this.props.gig.tasks.map((task) =>
                <div style={{ border: "solid" }} key={task.id}
                    onClick={this.handleToggle}>
                    <h4>{task.task_title}</h4>
                    <p>{task.task_description}</p>
                </div>
            )

        return (
            <div >
                {taskView}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let { gigs } = state
    return { gigs }
}

export default connect(mapStateToProps)(Task);