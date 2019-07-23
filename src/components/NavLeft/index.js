import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";
import { Menu } from "antd";

class NavLeft extends React.Component {
  state = {
    current: 'login',
  };

  handleClick = e => {
    console.log( e);
    
  };
  render() {
    const { SubMenu } = Menu;
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
       
           <Menu.Item key="1">
           <Link to="/home">首页</Link>
           </Menu.Item>
         
          <Menu.Item key="2">员工管理</Menu.Item>
          
          <SubMenu  
            key="sub1"
            title={
              <span>
                <span>订单管理</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to="/audit">待审核</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/execute">正在执行</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/finish">结束订单</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="6">
            <Link to="/finance">财务</Link>
          </Menu.Item>
          <Menu.Item key="7">权限设置</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);
