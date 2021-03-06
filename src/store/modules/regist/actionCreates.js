import * as contans from './contans';
import ajax from './../../../ajax';
import { resolve6 } from 'dns';


// 注册问题，
export const userRegist = (value)=>{
  return dispatch=>{
    value = JSON.stringify(value)
    console.log(value)
    ajax('http://10.36.140.222:9090/login/add',value,'POST').then( res=>{
      if(res.code==200){
        dispatch({
          type:contans.USER_ADD,
          value:res.doc
        })
      }
    }).then(
      dispatch(
        userList()
      )
    )
  }
}

// 列表内容请求
export const userList= ()=>{
  return dispatch=>{
    ajax('http://10.36.140.222:9090/login/list').then( res=>{
        res.forEach(item => {
          item['key']=item['_id']
          item['name']=item['username']
          item['department']=item['post']
          item['number']=item['_id']
          delete item['username']
          delete item['post']
        });
        dispatch({
          type:contans.GET_USRE,
          res
        })
    })
  }
}


// 删除一个员工
export const delU = (id)=>{
  let condition = {_id:id}
  condition = JSON.stringify(condition)
  console.log(condition)
  return dispatch=>{
    ajax(`http://10.36.140.222:9090/login/del`,condition,'POST')
    .then( res=>{
      if(res.code==200){
        dispatch(userList())
      }
    } )
  }
}