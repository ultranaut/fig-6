import React from 'react';

class Output extends React.Component {
  render() {
    return (
      <div className="output">
        <div className="display">{this.props.output}</div>
        <input
          type="button"
          className="clear-button"
          value="clear"
          onClick={this.props.clearSignal}
        />
      </div>
    );
  }
}

export default Output;
