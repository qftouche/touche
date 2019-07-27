import * as contans from './contans';
import ajax from './../../../ajax';


export const getFinance = ()=>{
  return dispatch=>{
      ajax('http://10.36.140.222:9090/financy/list')
      .then( res=>{
        dispatch({
          type:contans.FINANCY_DATA,
          value:res
        })
      })
    }
}