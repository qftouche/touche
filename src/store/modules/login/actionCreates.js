import * as contans from './contans';
import ajax from './../../../ajax';
import  { message } from "antd"

// 登录问题，
export const userLogin = (value,props)=>{
  return dispatch=>{
    value = JSON.stringify(value)
    ajax('http://10.36.140.222:9090/login/login',value,'POST').then( res=>{
      if(res.code==200){
        message.success("登陆成功")
        dispatch({
          type:contans.USER_LOGIN,
          value:res.user
        })
        localStorage.setItem('user',JSON.stringify(res.user))
        props.history.replace('/')
      } else {
        message.warn("登陆失败 用户名或者密码错误")
      }

    })
    
  }
}

// 第一次进入判断本地有木有登录
export const getUserInfor = ()=>{
  return dispatch=>{
    let value = JSON.parse(localStorage.getItem('user'))
    console.log(value)
    dispatch({
      type:contans.USER_LOGIN,
      value:value
    })
  }
}
