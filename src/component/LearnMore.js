import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LearnMore extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div>
        <h1> GIG TIME IS #1! </h1>
        <h2> Get Started Today!! </h2>
        <Link to='register'><button>Register Here!</button></Link>
      </div>
    )
  }
}