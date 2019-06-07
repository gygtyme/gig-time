import React, { Component } from "react";
import { ScrollTo } from "react-scroll-to";
 
export default class Scroller extends Component {
  render() {
    return (
      <ScrollTo>
        {({ scrollTo }) => (
          <a onClick={() => scrollTo({ x: 20, y: this.props.y })}><i style={{fontSize: 50, zIndex: 10}} class="fas fa-arrow-down"></i></a>
        )}
      </ScrollTo>
    );
  }
}