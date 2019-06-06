import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/LearnMore.css';
import Iframe from 'react-iframe';

export default class LearnMore extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div>
        <div className='learnMoreHero'>
          <div className='heroText'>
            <h2>Welcome to GIG Time!</h2>
            <h4>We are fast, furious, and efficient!</h4>
            <h2>Are You?</h2>
          </div>
        </div>
        <section className='learnMoreCardContainer'>
          <div className='learnMoreCard'>You'll Get Hot Chicks</div>
          <div className='learnMoreCard'>You'll Get The Fat Stacks</div>
          <div className='learnMoreCard'>You'll Probably Get Free Drugs</div>
        </section>
        <section className='learnMoreVideo'>
          <Iframe 
            width="700" 
            height="400" 
            url="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />
        </section>
      </div>
    )
  }
}