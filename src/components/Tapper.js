import React from 'react';

class Tapper extends React.Component {
  state = { display: '' };

  componentDidMount = () => {
    // keyboard events
    window.addEventListener('keydown', this.props.handleSignalStart, false);
    window.addEventListener('keyup', this.props.handleSignalEnd, false);

    // touch events
    var pad = document.getElementById('tap-pad');
    pad.addEventListener('touchstart', this.props.handleSignalStart, false);
    pad.addEventListener('touchend', this.props.handleSignalEnd, false);
  };

  render() {
    return (
      <div id="tap-pad" className="input-area">
        <h2>Tap it out here...</h2>
        <div className="tent-pole">
          <p className="small">(or use the alt/option key)</p>
        </div>
      </div>
    );
  }
}

export default Tapper;
