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

  updateInput: function (inputValue) {
    this.setState({
      input: inputValue
    }, this.decodeInput);
  },

  handleKeyDown: function (e) {
    if (e.keyCode === 18 && !this.state.keydown) {
      e.preventDefault();
      var now = window.performance.now();
      if (now - this.state.upTime > 3000) {
        this.setState({
          input: this.state.input + ' / '
        });
      }
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
        // console.log('dot', duration);
      }
      // else if (duration > 2 * this.state.dotDuration) {
      else {
        input = '-';
        // console.log('dash', duration);
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
      <Display output={this.state.output}
               input={this.state.input}
               updateInput={this.updateInput} />
    );
  }

});

var Display = React.createClass({ // eslint-disable-line no-unused-vars
  render: function () {
    return (
      <div className="app">
        <header>
          <h1>Morse Decoder</h1>
          <img src="images/L-Telegraph1_mod.png" />
        </header>
        <div className="tap">
          <h2>Tap it out...</h2>
          <p className='small'>(using the alt/option key)</p>
        </div>
        <hr />
        <div className="paste">
          <h2>...or paste it</h2>
          <Input decodeInput={this.props.decodeInput}
                 updateInput={this.props.updateInput} />
        </div>
        <Output output={this.props.output} />
      </div>
    );
  }

});

var Input = React.createClass({ // eslint-disable-line no-unused-vars
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
      <textarea className="mcode"
                onChange={this.handleChange}
                value={this.state.input} />
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

