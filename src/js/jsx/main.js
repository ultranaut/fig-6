/* global React */
'use strict';

var App = React.createClass({ // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return {
      input: '',
      output: '',
      dotDuration: 200,   // 6wpm
      hotKey: 18,         // alt/option key
      signalOn: false,
      signalStart: 0,
      signalEnd: 0
    };
  },

  codeMap: window.codeMap,

  updateInput: function (inputValue) {
    this.setState({
      input: inputValue
    }, this.decodeInput);
  },

  handleSignalStart: function (e) {
    // prevent keydown and touchstart events from repeatedly
    // triggering this
    if (e.keyCode === this.state.hotKey
        || e.type === 'touchstart'
        && !this.state.signalOn) {
      // let me handle this, thank you
      e.preventDefault();

      var now = window.performance.now();

      if (this.state.signalEnd > 0) {
        var pause = now - this.state.signalEnd;
      }

      // if really long pause, start a new word
      if (pause > 7 * this.state.dotDuration) {
        this.setState({
          input: this.state.input + ' / '
        });
      }
      else if (pause > 3 * this.state.dotDuration) {
        this.setState({
          input: this.state.input + ' '
        });
      }
      this.setState({ signalEnd: 0 });

      this.setState({ signalOn: true, signalStart: now });
    }
  },

  handleSignalEnd: function () {
    if (this.state.signalOn === true) {
      var now = window.performance.now();
      var duration = now - this.state.signalStart;
      var input = '';
      if (duration < this.state.dotDuration) {
        input = '.';
      }
      else {
        input = '-';
      }
      this.setState({
        signalOn: false,
        signalStart: 0,
        signalEnd: now,
        input: this.state.input + input
      });
      this.decodeInput();
    }
  },

  decodeInput: function () {
    var tokens = this.state.input.split(' ');
    console.log(tokens);
    var decoded = '';
    var char;
    for (var idx in tokens) {
      var token = tokens[idx];
      if (token === '') {
        continue;
      }
      if (token === '/') {
        char = ' ';
      }
      else {
        char = this.codeMap[token];
      }
      decoded += typeof char !== 'undefined' ? char : '';
    }
    this.setState({ output: decoded });
  },

  render: function () {
    return (
      <Display output={this.state.output}
               input={this.state.input}
               updateInput={this.updateInput}
               handleSignalStart={this.handleSignalStart}
               handleSignalEnd={this.handleSignalEnd} />
    );
  }
});



/*
 * --- Its's go time --------------------------------------------------
 */
/* eslint-disable no-unused-vars*/
var chatApp = React.render(<App url='http://localhost:1337' />,
                           document.querySelector('.container'));
/* eslint-enable no-unused-vars*/

