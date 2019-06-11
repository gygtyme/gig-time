import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Sidebar from "react-sidebar"

export default class HamburgerMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mobileBarOpen: false
    };
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  navigationLinks = () => {
    return [
      <ul key={10} className="hamburger_container">
        
        <li className="link_container" key={1}><Link to='/userHome' className="link_text">Gigs</Link></li>
        <li className="link_container" key={2}><Link to='/userHome' className="link_text">History</Link></li>
        <li className="link_container" key={3}><Link to='/userHome' className="link_text"></Link></li>
        <li className="link_container" key={4}><Link to='/userHome' className="link_text">Gigs</Link></li>
      </ul>
    ];
  }

  renderMobileNav() {
    if(this.state.mobileNavVisible) {
      return this.navigationLinks();
    }
  }
  
  handleNavClick() {
    if(!this.state.mobileNavVisible) {
      this.setState({mobileNavVisible: true});
    } else {
      this.setState({mobileNavVisible: false});
    }
  }

  renderNavigation() {
    if(this.state.windowWidth <= 1080) {
      return [
        <div key={6} className="mobile_nav">
          <p  key={8} onClick={this.handleNavClick.bind(this)}><i key={9} className="material-icons"><i className="fas fa-bars"></i></i></p>
          {this.renderMobileNav()}
        </div>
      ];
    } else {
      return [
        <div key={7} className="nav_menu">
          {this.navigationLinks()}
        </div>
      ]; 
    }
  }

  sidebarOpen = () => {
    this.setState({
      mobileBarOpen: !this.state.mobileBarOpen
    })
  }
  render() {
    return(
      <div className="nav_container">
        <Sidebar className="mobileNavView"
        sidebar={<b>Sidebar Content</b>}
        open={this.state.mobileNavVisible}
        onSetOpen={this.renderNavigation}
        styles={{sidebar: {background: "grey"}}}
        >
          <button onClick={this.renderNavigation}></button>
        </Sidebar>
      </div>
    )
  }
}