/* global React */
'use strict';

var Display = React.createClass({ // eslint-disable-line no-unused-vars
  render: function () {
    return (
      <div className="app">
        <header>
          <h1>Fig. 6.</h1>
          <img src="images/L-Telegraph1_mod.png" alt="Fig. 6." />
        </header>
        <Tapper handleSignalStart={this.props.handleSignalStart}
                handleSignalEnd={this.props.handleSignalEnd} />
        <Output output={this.props.output} />
      </div>
    );
  }
});
