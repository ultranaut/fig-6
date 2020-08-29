import React from 'react';
import telegraph from '../images/L-Telegraph1_mod.png';
import Tapper from './Tapper';
import Output from './Output';
import { codeMap } from '../codemap';

class App extends React.Component {
  state = {
    signal: '',
    decoded: '',
  };

  codeMap = codeMap;

  updateSignal = (signal) => {
    this.setState({ signal: this.state.signal + signal }, this.decodeSignal);
  };

  clearSignal = () => {
    this.setState({ signal: '' }, this.decodeSignal);
  };

  decodeSignal = () => {
    const tokens = this.state.signal.split(' ');
    const decoded = tokens.reduce((decoded, token) => {
      return decoded + (this.codeMap[token] || '');
    }, '');
    this.setState({ decoded: decoded });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Fig. 6.</h1>
          <img src={telegraph} alt="Fig. 6." />
        </header>
        <Tapper sendSignal={this.updateSignal} clearSignal={this.clearSignal} />
        <Output output={this.state.decoded} />
      </div>
    );
  }
}

export default App;
