/* global React */
'use strict';

var Output = React.createClass({ // eslint-disable-line no-unused-vars
  render: function () {
    return (
      <div className="output">
        <div className="display">
          {this.props.output}
        </div>
        <input type="button" className="clear-button" value="clear" onClick={this.props.clearInput} />
      </div>
    );
  }
});


