import React from 'react';
import Admin from './admin';
import './App.scss'
import './admin.scss'

function App(props) {
  return (
    <div >
      {props.children}
    </div>
  );
}

export default App;
