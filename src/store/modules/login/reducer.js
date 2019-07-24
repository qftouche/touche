import * as contans from './contans'

const initstate={
  financy_data:[]
}




export default (state = initstate,action)=>{
  switch(action.type){
    case 'financy-data':
      return Object.assign({},state,{financy_data:action.value})
  }
  return state
}