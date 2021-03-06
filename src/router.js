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
import Finance from './pages/finance';
import User from "./pages/user/index";
import {getUserInfor} from './store/modules/login/actionCreates'
// 导出路由页面

export default class ERouter extends React.Component{
  render(){
    store.dispatch(getUserInfor())
    console.log(store.getState().login,'======')
    return (
    <HashRouter>
      <App>
        <Switch>
          {/* 登录注册页面路由 */}
          <Route path='/login' component={Login}/>
          {/* 主页面路由 */}
          <Route path="/" render={()=>
              {   
                if(store.getState().login.user){
                  if(store.getState().login.user.jurisdiction==0){
                    return (//boss
                      <Admin>
                        <Switch>
                          <Route path="/home" component={Home} />
                          <Route path="/form/reg" component={Reg} />
                          <Route path='/finance' component={Finance}/>
                          <Route path="/audit"   component={ Audit } />
                          <Route path="/execute" component={EXecu} />
                          <Route path='/finish' component={ Finish }/>
                          <Route path="/finance" component={ Finance } />
                          <Route path="/supermo" component={ SuperMo } /> 
                          <Route path="/user" component={ User } />
                          <Redirect to="/home" />
                        </Switch>
                      </Admin>)
                  }else if(store.getState().login.user.jurisdiction==1){
                    console.log('财务')
                    return (//财务
                      <Admin>
                        <Switch>
                          <Route path="/home" component={Home} />
                          <Route path="/form/reg" component={Reg} />
                          <Route path='/finance' component={Finance}/>
                          <Route path="/audit"   component={ Audit } />
                          <Route path="/execute" component={EXecu} />
                          <Route path='/finish' component={ Finish }/>
                          <Route path="/finance" component={ Finance } />
                          <Route path="/user" component={ User } />
                          <Redirect to="/home" />
                        </Switch>
                      </Admin>)
                    }else if(store.getState().login.user.jurisdiction==2){
                      console.log('人力')
                      return (//人力
                        <Admin>
                          <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/form/reg" component={Reg} />
                            <Route path="/user" component={ User } />
                            <Redirect to="/home" />
                          </Switch>
                        </Admin>)
                    }else{
                      console.log('客服')
                      return (//客服
                        <Admin>
                          <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/audit"   component={ Audit } />
                            <Route path="/execute" component={EXecu} />
                            <Route path='/finish' component={ Finish }/>
                            <Redirect to="/home" />
                          </Switch>
                        </Admin>)
                    }
                }else{
                  return <Redirect to='/login'/>
                }
              }
            } />
        </Switch>
      </App>
    </HashRouter>
    )
  }
}