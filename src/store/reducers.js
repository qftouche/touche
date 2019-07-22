import * as contans from './contans'

const initstate={
  userInfo:null
}

export default (state = initstate,action)=>{
  switch(action.type){
    case 'user-login':
      console.log(action.value)
      return Object.assign({},state,{userInfo:action.value})
  }
}