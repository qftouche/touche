import * as contans from './contans'

const initstate={
  userInfo:null
}

export default (state = initstate,action)=>{
  switch(action.type){
    case 'user-login':
      return Object.assign({},state,{userInfo:action.value})
  }
  return state
}