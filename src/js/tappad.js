/* global React */
'use strict';

var Tapper = React.createClass({displayName: "Tapper", // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return {
      display: ''
    };
  },

  componentDidMount: function () {
    // keyboard events
    window.addEventListener('keydown', this.props.handleSignalStart, false);
    window.addEventListener('keyup', this.props.handleSignalEnd, false);

    // touch events
    var pad = document.getElementById('tap-pad');
    pad.addEventListener('touchstart', this.props.handleSignalStart, false);
    pad.addEventListener('touchend', this.props.handleSignalEnd, false);
  },

  render: function () {
    return (
      React.createElement("div", {id: "tap-pad", className: "input-area"}, 
        React.createElement("h2", null, "Tap it out here..."), 
        React.createElement("div", {className: "tent-pole"}, 
          React.createElement("p", {className: "small"}, "(or use the alt/option key)")
        )
      )
    );
  }
});

