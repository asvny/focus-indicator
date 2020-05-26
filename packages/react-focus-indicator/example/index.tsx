import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FocusIndicator from '../.';

const App = () => {
  return (
    <div>
      <FocusIndicator />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
