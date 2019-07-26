import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";
import { Menu } from "antd";
import store from './../../store'
import {getMenuName} from './../../store/modules/head/actionCreates'

class NavLeft extends React.Component {
  state = {
    current: "login"
  };

  handleClick = e => {
    this.props.getMenu(e.key)
  };
  render() {
    const { SubMenu } = Menu;
    if(store.getState().login.user.jurisdiction==0){
      return (
        <div className="navcontent">
          <a href="#">
            <div className="navlogo">
              <img src="./assets/logo-ant.svg" alt="logo" />
              <h1>IMooc MS</h1>
            </div>
          </a>
          <Menu
            theme="dark"
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
          >
            <Menu.Item key="首页">
              <Link to="/home">首页</Link>
            </Menu.Item>
  
            <Menu.Item key="员工管理">
              <Link to="/user">员工管理</Link>
            </Menu.Item>
  
            <SubMenu
              key="订单管理"
              title={
                <span>
                  <span>订单管理</span>
                </span>
              }
            >
              <Menu.Item key="待审核">
                <Link to="/audit">待审核</Link>
              </Menu.Item>
              <Menu.Item key="正在执行">
                <Link to="/execute">正在执行</Link>
              </Menu.Item>
              <Menu.Item key="结束订单">
                <Link to="/finish">结束订单</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="财务">
              <Link to="/finance">财务</Link>
            </Menu.Item>
            <Menu.Item key="权限设置">
              <Link to="/supermo">权限设置</Link>
            </Menu.Item>
          </Menu>
        </div>
      );
    }else if(store.getState().login.user.jurisdiction==1){
      return (
        <div className="navcontent">
          <a href="#">
            <div className="navlogo">
              <img src="./assets/logo-ant.svg" alt="logo" />
              <h1>IMooc MS</h1>
            </div>
          </a>
          <Menu
            theme="dark"
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
          >
            <Menu.Item key="首页">
              <Link to="/home">首页</Link>
            </Menu.Item>
  
            <Menu.Item key="员工管理">
              <Link to="/user">员工管理</Link>
            </Menu.Item>
  
            <SubMenu
              key="订单管理"
              title={
                <span>
                  <span>订单管理</span>
                </span>
              }
            >
              <Menu.Item key="待审核">
                <Link to="/audit">待审核</Link>
              </Menu.Item>
              <Menu.Item key="正在执行">
                <Link to="/execute">正在执行</Link>
              </Menu.Item>
              <Menu.Item key="结束订单">
                <Link to="/finish">结束订单</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="财务">
              <Link to="/finance">财务</Link>
            </Menu.Item>
          </Menu>
        </div>
      );
    }else if(store.getState().login.user.jurisdiction==2){
      return (
        <div className="navcontent">
          <a href="#">
            <div className="navlogo">
              <img src="./assets/logo-ant.svg" alt="logo" />
              <h1>IMooc MS</h1>
            </div>
          </a>
          <Menu
            theme="dark"
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
          >
            <Menu.Item key="首页">
              <Link to="/home">首页</Link>
            </Menu.Item>
  
            <Menu.Item key="员工管理">
              <Link to="/user">员工管理</Link>
            </Menu.Item>
          </Menu>
        </div>
      );
    }else{
      return (
        <div className="navcontent">
          <a href="#">
            <div className="navlogo">
              <img src="./assets/logo-ant.svg" alt="logo" />
              <h1>IMooc MS</h1>
            </div>
          </a>
          <Menu
            theme="dark"
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
          >
           <Menu.Item key="首页">
              <Link to="/home">首页</Link>
            </Menu.Item>
  
            <SubMenu
              key="订单管理"
              title={
                <span>
                  <span>订单管理</span>
                </span>
              }
            >
              <Menu.Item key="待审核">
                <Link to="/audit">待审核</Link>
              </Menu.Item>
              <Menu.Item key="正在执行">
                <Link to="/execute">正在执行</Link>
              </Menu.Item>
              <Menu.Item key="结束订单">
                <Link to="/finish">结束订单</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      );
    }
  }
}

export default connect((state)=>{
  return {
    
  }
},(dispatch)=>{
  return {
    getMenu(value){
      dispatch(getMenuName(value))
    }
  }
})(NavLeft);
