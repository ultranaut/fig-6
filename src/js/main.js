/* global React */
'use strict';

var App = React.createClass({displayName: "App", // eslint-disable-line no-unused-vars
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

  codeMap: {
    '.-': 'A',
    '-...': 'B',
    '-.-.': 'C',
    '-..': 'D',
    '.': 'E',
    '..-.': 'F',
    '--.': 'G',
    '....': 'H',
    '..': 'I',
    '.---': 'J',
    '-.-': 'K',
    '.-..': 'L',
    '--': 'M',
    '-.': 'N',
    '---': 'O',
    '.--.': 'P',
    '--.-': 'Q',
    '.-.': 'R',
    '...': 'S',
    '-': 'T',
    '..-': 'U',
    '...-': 'V',
    '.--': 'W',
    '-..-': 'X',
    '-.--': 'Y',
    '--..': 'Z',
    '-----': '0',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '.-.-.-': '.',
    '--..--': ',',
    '---...': ':',
    '..--..': '?',
    '.----.': '\'',
    '-....-': '-',
    '-..-.': '/',
    '-.--.-': '(',
    '.-..-.': '"',
    '.--.-.': '@',
    '-...-': '=',

    // typographical conveniences to separate words
    '/': ' ',
    '|': ' '
  },

  // componentDidMount: function () {
  //   // keyboard events
  //   window.addEventListener('keydown', this.handleSignalStart);
  //   window.addEventListener('keyup', this.handleSignalEnd);

  //   // touch events
  //   var pad = document.getElementById('tap-pad');
  //   pad.addEventListener('touchstart', this.handleSignalStart, false);
  //   pad.addEventListener('touchend', this.handleSignalEnd, false);
  // },

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
    console.log(this.state.input, tokens);
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
      React.createElement(Display, {output: this.state.output, 
               input: this.state.input, 
               updateInput: this.updateInput, 
               handleSignalStart: this.handleSignalStart, 
               handleSignalEnd: this.handleSignalEnd})
    );
  }
});

var Display = React.createClass({displayName: "Display", // eslint-disable-line no-unused-vars
  render: function () {
    return (
      React.createElement("div", {className: "app"}, 
        React.createElement("header", null, 
          React.createElement("h1", null, "Fig. 6."), 
          React.createElement("img", {src: "images/L-Telegraph1_mod.png", alt: "Fig. 6."})
        ), 
        React.createElement(Tapper, {handleSignalStart: this.props.handleSignalStart, 
                handleSignalEnd: this.props.handleSignalEnd}), 
        React.createElement(KeyIn, {decodeInput: this.props.decodeInput, 
                updateInput: this.props.updateInput, 
                input: this.props.input}), 
        React.createElement(Output, {output: this.props.output})
      )
    );
  }
});

var Tapper = React.createClass({displayName: "Tapper", // eslint-disable-line no-unused-vars
  componentDidMount: function () {
    // keyboard events
    window.addEventListener('keydown', this.props.handleSignalStart, false);
    window.addEventListener('keyup', this.props.handleSignalEnd, false);

    // touch events
    var pad = document.getElementById('tap-pad');
    pad.addEventListener('touchstart', this.props.handleSignalStart, false);
    pad.addEventListener('touchend', this.props.handleSignalEnd, false);

    console.log(this.props.handleSignalStart);
  },

  render: function () {
    return (
      React.createElement("div", {id: "tap-pad"}, 
        React.createElement("h2", null, "Tap it out here..."), 
        React.createElement("p", {className: "small"}, "(or use the alt/option key)")
      )
      );
  }
});

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
      React.createElement("div", {className: "paste"}, 
        React.createElement("h2", null, "...or use the keyboard"), 
        React.createElement("textarea", {className: "mcode", 
                  onChange: this.handleChange, 
                  value: this.props.input, 
                  placeholder: "dots 'n' dashes 'n' such"})
      )
    );
  }
});

var Output = React.createClass({displayName: "Output", // eslint-disable-line no-unused-vars
  render: function () {
    return (
      React.createElement("div", {className: "output"}, 
        this.props.output
      )
    );
  }
});

/*
 * --- Its's go time --------------------------------------------------
 */
/* eslint-disable no-unused-vars*/
var chatApp = React.render(React.createElement(App, {url: "http://localhost:1337"}),
                           document.querySelector('.container'));
/* eslint-enable no-unused-vars*/

