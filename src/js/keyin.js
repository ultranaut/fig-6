/* global React */
'use strict';

var KeyIn = React.createClass({displayName: "KeyIn", // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return {
      input: ''
    };
  },

  handleChange: function (e) {
    var invalidChars = /[^. /|-]/g;
    // filter out invalid chars
    var input = e.target.value.replace(invalidChars, '');
    this.setState({
      input: input
    });
    this.props.updateInput(input);
  },

  render: function () {
    return (
      React.createElement("div", {id: "key-in", className: "input-area"}, 
        React.createElement("h2", null, "...or use the keyboard"), 
        React.createElement("textarea", {className: "mcode", 
                  onChange: this.handleChange, 
                  value: this.props.input, 
                  placeholder: "dots 'n' dashes 'n' such"})
      )
    );
  }
});

