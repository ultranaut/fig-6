/* global React */
'use strict';

var App = React.createClass({ // eslint-disable-line no-unused-vars
  getInitialState: function () {
    return {
      input: '',
      output: '',

      dotDuration: 150,

      keydown: false,
      hotKey: 18, // alt/option key

      downTime: 0,
      upTime: 0,

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
				'/': ' ',
				'|': ' '
      }
    };
  },

  componentDidMount: function () {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  },

  handleKeyDown: function (e) {
    if (e.keyCode === 18 && !this.state.keydown) {
      e.preventDefault();
      var now = window.performance.now();
      if (now - this.state.upTime > 4 * this.state.dotDuration) {
        this.setState({
          input: this.state.input + ' '
        });
      }
      this.setState({ upTime: 0 });

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
        console.log('dot', duration);
      }
      // else if (duration > 2 * this.state.dotDuration) {
      else {
        input = '-';
        console.log('dash', duration);
      }
      this.setState({
        keydown: false,
        downTime: 0,
        upTime: now,
        input: this.state.input + input
      });
      this.decodeInput();
    }
  },

  decodeInput: function () {
    var tokens = this.state.input.split(' ');
    console.log(tokens);
    var decoded = '';
    for (var idx in tokens) {
      var token = tokens[idx];
      if (token === '') { continue; }
      var char = this.state.map[token];
      decoded += typeof char !== 'undefined' ? char : '';
    }
    this.setState({ output: decoded });
  },

  render: function () {
    return (
      <Display output={this.state.output} decodeInput={this.decodeInput} />
    );
  }

});

var Display = React.createClass({ // eslint-disable-line no-unused-vars
  render: function () {
    return (
      <div className="app">
        <img src="images/L-Telegraph1.png" />
        <header>
          <h1>Tap it out...</h1>
          <p>...using the alt/option key</p>
          <p className="small">(sorry no touch events at this time)</p>
        </header>
        <Output output={this.props.output} />
      </div>
    );
  }

});

var Output = React.createClass({ // eslint-disable-line no-unused-vars
  render: function () {
    return (
      <div className="output">
        {this.props.output}
      </div>
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

