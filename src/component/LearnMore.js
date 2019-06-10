import React, { Component } from 'react';
import './styles/LearnMore.css';
import Iframe from 'react-iframe';
import Scroller from './Scroller';
import { Link } from 'react-router-dom';

export default class LearnMore extends Component {


  render() {
    return (
      <div>
        <div className='learnMoreHero'>
          <div className='heroText'>
            <h2>Welcome to GIG Time!</h2>
            <h4>We are fast, furious, and efficient!</h4>
            <Link to='/register'><button className='registerButton'>Register Today!</button></Link>
            <h3>Learn More!</h3>
            <Scroller y={600}/>
          </div>
        </div>
        
        <div className='learnMoreCardContainer' id='learnMoreCardContainer'>
          <div className='midPageContainer'>
            <div className='learnMoreCard'>You'll Get Hot Chicks</div>
            <div className='learnMoreCard'>You'll Get The Fat Stacks</div>
            <div className='learnMoreCard'>You'll Probably Get Free Drugs</div>
          </div>
          <Link to='/register'><button className='registerButton'>Register Here!</button></Link>
          <p>Learn How It Works Below!</p>
          <div><Scroller y={1200}/></div>
        </div>

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