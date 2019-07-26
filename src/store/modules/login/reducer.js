import * as contans from './contans'

const initstate={
  userinfo:''
}

export default (state = initstate,action)=>{
  switch(action.type){
    case 'user-login':
      return Object.assign({},state,{user:action.value})
  }
  return state
}