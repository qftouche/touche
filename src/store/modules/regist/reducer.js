import * as contans from './contans'

const initstate={
  employee:[],
  data:[]
}




export default (state = initstate,action)=>{
  switch(action.type){
    case 'employee-regist':
      let arr = initstate.employee;
      arr.push(action.value)
      return Object.assign({},state,{employee:arr});
    case 'get-employee':
      console.log(action.res,'------')
      return Object.assign({},state,{data:action.res});
  }
  return state 
}