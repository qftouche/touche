import React from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
// 路由页面引入
import App from './App'
import Admin from './admin'
import Home from './pages/home'
import Reg from './pages/form/regist'
import Login from './Login'

// 导出路由页面

export default class ERouter extends React.Component{
  render(){
    let user = localStorage.getItem('user');
    return (
    <HashRouter>
      <App>
        <Switch>
          {/* 登录注册页面路由 */}
          <Route path='/login' component={Login}/>
          {/* 主页面路由 */}
          <Route path="/" render={()=>
            {
              if(user){
                return (<Admin>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/form/reg" component={Reg} />
                  
                  </Switch>
                </Admin>)
              }else{
                return <Redirect to="/login"/>
              }
            }
            } />
        </Switch>
      </App>
    </HashRouter>
    )
  }
}