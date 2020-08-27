import React from 'react';

class Tapper extends React.Component {
  config = {
    hotKey: 18, // alt/option key
    dotDuration: 200, // 6wpm
  };

  state = {
    input: '',
    signalOn: false,
    signalStart: 0,
    signalEnd: 0,
  };

  handleSignalStart = (e) => {
    let pause = 0;

    // prevent keydown and touchstart events from repeatedly
    // triggering this
    if (
      e.keyCode === this.config.hotKey ||
      (e.type === 'touchstart' && !this.state.signalOn)
    ) {
      // let me handle this, thank you
      e.preventDefault();

      // get the time our signal started
      const now = window.performance.now();

      // figure out how long ago the previous signal ended
      if (this.state.signalEnd > 0) {
        pause = now - this.state.signalEnd;
      }

      // start a new signal
      this.setState({
        signalOn: true,
        signalStart: now,
        signalEnd: 0,
      });

      // if really long pause, indicate a new word...
      if (pause > 7 * this.config.dotDuration) {
        this.setState({
          input: this.state.input + ' / ',
        });
      }
      // ...otherwise it's a new character
      else if (pause > 3 * this.config.dotDuration) {
        this.setState({
          input: this.state.input + ' ',
        });
      }
      // default: it's a dit or a dah
    }
  };

  handleSignalEnd = () => {
    if (this.state.signalOn === true) {
      const now = window.performance.now();
      const signalDuration = now - this.state.signalStart;
      let input = '';

      // dit or dah?
      if (signalDuration < this.config.dotDuration) {
        input = '.';
      } else {
        input = '-';
      }

      // clear the active signal
      this.setState({
        signalOn: false,
        signalStart: 0,
        signalEnd: now,
        input: this.state.input + input,
      });

      console.log('input:', this.state.input);
      this.props.updateAppInput(this.state.input);
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
        </div>
      </div>
    );
  }
}

export default Tapper;
