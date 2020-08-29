import React from 'react';

class Output extends React.Component {
  render() {
    return (
      <div className="output">
        <div className="display">{this.props.output}</div>
      </div>
    );
  }
}

export default Output;
