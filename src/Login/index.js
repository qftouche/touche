import React from "react";
import './index.scss';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import {connect} from 'react-redux';
import store from './../store';
import router from 'react-router-dom'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loading:false
    }
  }
  // 点击一脚事件处理
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actLogin(values,this.props);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="wrap-login">
        <h1 style={ {"color":"red"} }>{this.props.userInfo ? this.props.userInfo.username : '用户名'}</h1>
        <div className="login-box">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "请输入您的用户名!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入账号"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "请输入您的密码!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={this.state.loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrpaLogin = Form.create({ name: 'normal_login' })(Login);
// 把state添加到props
const mapStateToProps = (state)=>{
  return {
    userInfo:state.userInfo
  }
}
// 把dispacth添加到props
const mapDispacthToProps = (dispatch)=>{
  return {
    actLogin(value,props){
      dispatch()
    }
  }
}

export default connect(mapStateToProps,mapDispacthToProps)(WrpaLogin);
