import React from 'react';

class Tapper extends React.Component {
  config = {
    hotKey: 18, // alt/option key
    dotDuration: 200, // 6wpm
    longPressDuration: 1000,
  };

  signal = {
    on: false,
    start: 0,
    end: 0,
  };

  handleSignalStart = (e) => {
    let pause = 0;

    // prevent keydown and touchstart events from repeatedly
    // triggering this
    if (
      e.keyCode === this.config.hotKey ||
      (e.type === 'touchstart' && !this.signal.on)
    ) {
      // let me handle this, thank you
      e.preventDefault();

      // get the time our signal started
      const now = window.performance.now();

      // figure out how long ago the previous signal ended
      if (this.signal.end > 0) {
        pause = now - this.signal.end;
      }

      // start a new signal
      this.signal.on = true;
      this.signal.start = now;
      this.signal.end = 0;

      // if really long pause, we're starting a new word...
      if (pause > 7 * this.config.dotDuration) {
        this.props.sendSignal(' / ');
      }
      // ...otherwise it's a new character...
      else if (pause > 3 * this.config.dotDuration) {
        this.props.sendSignal(' ');
      }
      // ...otherwise it's just another dit or dah
    }
  };

  handleSignalEnd = () => {
    if (this.signal.on === true) {
      const now = window.performance.now();
      const signalDuration = now - this.signal.start;
      let signal = '';

      // dit or dah?
      signal = signalDuration < this.config.dotDuration ? '.' : '-';

      // clear the active signal
      this.signal.on = false;
      this.signal.start = 0;
      this.signal.end = now;

      // clear signal on long press
      if (signalDuration > this.config.longPressDuration) {
        this.props.clearSignal();
      }
      // otherwise, send the signal up
      else {
        this.props.sendSignal(signal);
      }
    }
  };

  componentDidMount = () => {
    // keyboard events
    window.addEventListener('keydown', this.handleSignalStart, false);
    window.addEventListener('keyup', this.handleSignalEnd, false);

    // touch events
    const pad = document.getElementById('tap-pad');
    pad.addEventListener('touchstart', this.handleSignalStart, false);
    pad.addEventListener('touchend', this.handleSignalEnd, false);
  };

  render() {
    return (
      <div id="tap-pad" className="input-area">
        <h2>Tap it out here...</h2>
        <div className="tent-pole">
          <p className="small">(or use the alt/option key)</p>
          <p>Long press to clear</p>
        </div>
      </div>
    );
  }
}

export default Tapper;
