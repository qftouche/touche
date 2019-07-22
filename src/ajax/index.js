import axios from 'axios';

/**
 * 调用get和post请求(基于promise, 基于axios)
 * @param url
 * @param params
 * @param type
 * @returns {Promise<any>}
 * api.itlike.com/api/gethome?id=001&name=zhangsan&
 *
 */

 export default function ajax(url='',params={},type='GET'){
   return new Promise( (resolve,reject)=>{
    let promise
    if(type.toLocaleLowerCase()==='get'){
      let paramStr=''
      Object.keys(params).forEach( key => {
        paramStr += key + params[key] + '&'
      });
      // 去掉最后一个&
      if(paramStr != ''){
        paramStr.substr(0,paramStr.lastIndexOf('&'))
      }
      url += "?" + paramStr
      promise=axios.get(url)
    }else if( type.toLocaleLowerCase==='post' ){
      promise=axios.post(url,params)
    }
    promise.then( response => {
      resolve(response.data)
    } ).catch( error=>{
      reject(error)
    } )


   } )
 }