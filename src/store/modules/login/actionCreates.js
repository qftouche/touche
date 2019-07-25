import * as contans from './contans';
import ajax from './../../../ajax';


// 登录问题，
export const userLogin = (value,props)=>{
  return dispatch=>{
    value = JSON.stringify(value)
    ajax('http://10.36.140.222:9090/login/login',value,'POST').then( res=>{
      if(res.code==200){
        props.history.replace('/')
      }
    })
    
  }
}
