import * as contans from './contans';
import ajax from './../../../ajax';
import { resolve6 } from 'dns';


// 注册问题，export 
export const getMenuName=(value)=>{
  return dispatch=>{
    dispatch({
      type:contans.GET_MUEN_NAME,
      value
    })
  }
}
