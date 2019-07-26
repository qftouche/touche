import React from 'react';
import './App.scss';
import store from './store'
import {getUserInfor} from './store/modules/login/actionCreates'
class App extends React.Component{
  
  componentDidMount(){
    console.log(store.dispatch(getUserInfor()))
  }
  render(){
    return (
      <div className="wrap-app">
        {this.props.children}
      </div>
    );
  }
}
export default App;
