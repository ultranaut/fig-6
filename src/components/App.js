import React from 'react';
import telegraph from '../images/L-Telegraph1_mod.png';
import Tapper from './Tapper';
import Output from './Output';
import { codeMap } from '../codemap';

class App extends React.Component {
  state = {
    input: '',
    output: '',
  };

  codeMap = codeMap;

  updateInput = (inputValue) => {
    this.setState(
      {
        input: inputValue,
      },
      this.decodeInput
    );
  };

  clearInput = () => {
    this.setState(
      {
        input: '',
      },
      this.decodeInput
    );
  };

  decodeInput = () => {
    const tokens = this.state.input.split(' ');
    let decoded = '';
    let char;
    for (const idx in tokens) {
      const token = tokens[idx];
      if (token === '') {
        continue;
      }
      if (token === '/') {
        char = ' ';
      } else {
        char = this.codeMap[token];
      }
      decoded += typeof char !== 'undefined' ? char : '';
    }
    this.setState({ output: decoded });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Fig. 6.</h1>
          <img src={telegraph} alt="Fig. 6." />
        </header>
        <Tapper updateAppInput={this.updateInput} />
        <Output output={this.state.output} clearInput={this.clearInput} />
      </div>
    );
  }
}

export default App;
