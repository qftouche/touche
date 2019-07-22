import React from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
// 路由页面引入
import App from './App'
import Admin from './admin'
import Home from './pages/home'
import Reg from './pages/form/regist'
import Login from './Login'
import Audit from "./pages/order/index";
// 导出路由页面

export default class ERouter extends React.Component{
  render(){
    return (
    <HashRouter>
      <App>
        <Switch>
          {/* 登录注册页面路由 */}
          <Route path='/login' component={Login}/>
          {/* 主页面路由 */}
          <Route path="/" render={()=>
            <Admin>
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/form/reg" component={Reg} />
                <Route path="/audit" component={Audit}></Route>
                
              </Switch>
            </Admin>
            } />
        </Switch>
      </App>
    </HashRouter>
    )
  }
}