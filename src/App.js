import React from 'react';
import './App.scss';
import store from './store'
class App extends React.Component{
  
  render(){
    return (
      <div className="wrap-app">
        {this.props.children}
      </div>
    );
  }
}
export default App;
