import React from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom';
//仓库引入
import store from './store'
// 路由页面引入
import App from './App'
import Admin from './admin'
import Home from './pages/home/index'
import Reg from './pages/form/regist'
import Login from './Login'
import Audit from "./pages/order/index";
import EXecu from "./pages/execu/index";
import Finish from "./pages/finish/index";
import SuperMo from "./pages/supremo/index";
import Finance from './pages/finance'
// 导出路由页面

export default class ERouter extends React.Component{
  render(){
    let user = (store.getState('userInfo'))
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
                return (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/form/reg" component={Reg} />
                    <Route path='/finance' component={Finance}/>
                    <Route path="/audit"   component={ Audit } />
                    <Route path="/execute" component={EXecu} />
                    <Route path='/finish' component={ Finish }/>
                    <Route path="/supermo" component={ SuperMo } />
                    <Route path="/user" component={ SuperMo } />
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