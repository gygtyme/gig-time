import React, { Component } from "react";
import { ScrollTo } from "react-scroll-to";
 
export default class Scroller extends Component {
  render() {
    return (
      <ScrollTo>
        {({ scrollTo }) => (
          <a onClick={() => scrollTo({ id: "learnMoreCardContainer" y:500 })}><i style={{fontSize: 50, zIndex: 10}} className="fas fa-arrow-down"></i></a>
        )}
      </ScrollTo>
    );
  }
}
