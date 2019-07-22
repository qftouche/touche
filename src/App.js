import React from 'react';
import './App.scss'

function App(props) {
  return (
    <div className="wrap-app">
      {props.children}
    </div>
  );
}

export default App;
