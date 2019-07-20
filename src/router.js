import React from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
// 路由页面引入
import App from './App'








// 导出路由页面

export default class ERouter extends React.Component{
  render(){
    return (
    <HashRouter>
      <App>
        
      </App>
    </HashRouter>
    )
  }
}