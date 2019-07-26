import * as contans from './contans'

const initstate={
  menu:'首页'
}




export default (state = initstate,action)=>{
  switch(action.type){
    case 'get_muen_name':
      return Object.assign({},state,{menu:action.value});
  }
  return state 
}