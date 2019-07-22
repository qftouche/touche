import * as contans from './contans';
import ajax from './../ajax'

// 登录问题，
export const userLogin = (value)=>{
  return dispatch=>{
    ajax('http://localhost:9090/users','GET').then(res=>{
    // console.log(res)[ {id: 1, roles: 0, username: "admin", password: "123"}]
    let index = res.findIndex((item,index,arr)=>{
      return item.username == value.username && item.password == value.password
    })
    if(index != -1){
      dispatch({
        type:contans.USER_LOGIN,
        value:res[index]
      })
    }
  }) 
  }
}