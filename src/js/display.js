/* global React */
'use strict';

var Display = React.createClass({displayName: "Display", // eslint-disable-line no-unused-vars
  render: function () {
    return (
      React.createElement("div", {className: "app"}, 
        React.createElement("header", null, 
          React.createElement("h1", null, "Fig. 6."), 
          React.createElement("img", {src: "images/L-Telegraph1_mod.png", alt: "Fig. 6."})
        ), 
        React.createElement(Tapper, {handleSignalStart: this.props.handleSignalStart, 
                handleSignalEnd: this.props.handleSignalEnd}), 
        React.createElement(Output, {output: this.props.output, 
                clearInput: this.props.clearInput})
      )
    );
  }
});
