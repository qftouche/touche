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
    console.log( this.props )
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
       
           <Menu.Item key="1">首页</Menu.Item>
         
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
              <Link to="/order">待审核</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/execute">正在执行</Link>
            </Menu.Item>
            <Menu.Item key="5">已经结束</Menu.Item>
          </SubMenu>

          <Menu.Item key="6">财务</Menu.Item>
          <Menu.Item key="7">权限设置</Menu.Item>

        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);
