import React, { Component } from 'react';
import './styles/ClientView.css';
import ProgressBar from './ProgressBar';

class ClientView extends Component {
  constructor() {
    super()

    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div class='progress'>
          <ProgressBar />
        </div>
      </div>
    )
  }
}

export default ClientView