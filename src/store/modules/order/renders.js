

const initstate={
   orderlist:[]   // 添加的数据
}

export default (state=initstate,action)=>{
    if(action.type==='addorder'){ //将添加的数据存到仓库
      return Object.assign({},state,{ orderlist : [...state.orderlist,action.values] })
    }
    if(action.type==='initorderlist'){
      return Object.assign({},state,{ orderlist: [...state.orderlist, ...action.data] })
    }
    if(action.type==='delectone'){ // 删除操作
        let newlist = state.orderlist.filter((item)=>{
            return item._id !==action.id
        })
       return Object.assign({},state,{ orderlist : [ ...newlist ] })
    }
    return state
}