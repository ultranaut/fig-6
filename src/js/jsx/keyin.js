/* global React */
'use strict';

var KeyIn = React.createClass({ // eslint-disable-line no-unused-vars
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
      <div id="key-in" className="input-area">
        <h2>...or use the keyboard</h2>
        <textarea className="mcode"
                  onChange={this.handleChange}
                  value={this.props.input}
                  placeholder="dots 'n' dashes 'n' such" />
      </div>
    );
  }
});

