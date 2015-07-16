/* global React */
'use strict';

var App = React.createClass({displayName: "App", // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return {
      input: '',
      output: '',

      dotDuration: 150,

      hotKey: 18, // alt/option key
      keydown: false,

      downTime: 0,
      keyUpTime: 0,

      map: {
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

      ongoingTouches: []
    };
  },

  componentDidMount: function () {
    // keyboard events
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    // touch events
    var pad = document.getElementById('tap-pad');
    pad.addEventListener('touchstart', this.handleKeyDown, false);
    pad.addEventListener('touchend', this.handleKeyUp, false);
  },

  updateInput: function (inputValue) {
    this.setState({
      input: inputValue
    }, this.decodeInput);
  },

  handleKeyDown: function (e) {
    // only run this on initial keydown event
    if (e.keyCode === this.state.hotKey
        || e.type === 'touchstart'
        && !this.state.keydown) {
      e.preventDefault();
      var now = window.performance.now();

      if (this.state.keyUpTime > 0) {
        var pause = now - this.state.keyUpTime;
      }

      // if really long pause, start a new word
      if (pause > 3000) {
        this.setState({
          input: this.state.input + ' / '
        });
      }
      else if (pause > 4 * this.state.dotDuration) {
        this.setState({
          input: this.state.input + ' '
        });
      }
      this.setState({ keyUpTime: 0 });

      this.setState({ keydown: true, downTime: now });
    }
  },

  handleKeyUp: function () {
    if (this.state.keydown === true) {
      var now = window.performance.now();
      var duration = now - this.state.downTime;
      var input = '';
      if (duration < this.state.dotDuration) {
        input = '.';
      }
      else {
        input = '-';
      }
      this.setState({
        keydown: false,
        downTime: 0,
        keyUpTime: now,
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
        char = this.state.map[token];
      }
      decoded += typeof char !== 'undefined' ? char : '';
    }
    this.setState({ output: decoded });
  },

  render: function () {
    return (
      React.createElement(Display, {output: this.state.output, 
               input: this.state.input, 
               updateInput: this.updateInput})
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
        React.createElement("div", {id: "tap-pad"}, 
          React.createElement("h2", null, "Tap it out here..."), 
          React.createElement("p", {className: "small"}, "(or use the alt/option key)")
        ), 
        React.createElement("hr", null), 
        React.createElement(Output, {output: this.props.output}), 
        React.createElement("hr", null), 
        React.createElement("div", {className: "paste"}, 
          React.createElement("h2", null, "...or use the keyboard"), 
          React.createElement(Input, {decodeInput: this.props.decodeInput, 
                 updateInput: this.props.updateInput, 
                 input: this.props.input})
        )
      )
    );
  }

});

var Input = React.createClass({displayName: "Input", // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return {
      input: ''
    };
  },

  handleChange: function (e) {
    var inputValue = e.target.value;
    this.setState({
      input: inputValue
    });
    this.props.updateInput(inputValue);
  },

  render: function () {
    return (
      React.createElement("textarea", {className: "mcode", 
                onChange: this.handleChange, 
                value: this.props.input, 
                placeholder: "dots 'n' dashes 'n' such"})
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

