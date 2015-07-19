/* global React */
'use strict';

var Output = React.createClass({displayName: "Output", // eslint-disable-line no-unused-vars
  render: function () {
    return (
      React.createElement("div", {className: "output"}, 
        React.createElement("div", {className: "display"}, 
          this.props.output
        ), 
        React.createElement("input", {type: "button", className: "clear-button", value: "clear", onClick: this.props.clearInput})
      )
    );
  }
});


