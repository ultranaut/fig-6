/* global React */
'use strict';

var Output = React.createClass({displayName: "Output", // eslint-disable-line no-unused-vars
  render: function () {
    return (
      React.createElement("div", {className: "output"}, 
        this.props.output
      )
    );
  }
});


