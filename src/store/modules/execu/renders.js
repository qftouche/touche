const initstate = {
  orderlist: [],
  citylist:[],
  Overorderlist:[]
};

export default (state = initstate, action) => {
  if (action.type === "initorderlist") {  //初始化数据
    let orderlist = action.data
    let filterList=orderlist.map((item,index)=>{ // 将数组中的城市拿出来
       return item.address
    }) 
    return Object.assign({}, state, {
      orderlist: [...state.orderlist, ...action.data],citylist:[...filterList]
    });
  }
  if( action.type === 'delectorder') {  // 结束订单 将仓库对应的数据删除掉
    let id = action.id;
    let newlist = state.orderlist.filter((item,index)=>{
      return  item._id !== id
    })
    return Object.assign({},state,{ orderlist : [ ...newlist  ] })
  }
  if( action.type==='findlist'){ //将按照条件查找到的数据赋给仓库数据
    return Object.assign({},state,{ orderlist : [ ...action.findcitylist ] })
  }
 
  if(action.type === 'initoverlist'){  // 订单执行完毕的显示页面
    return Object.assign({}, state, {
      Overorderlist: [...state.Overorderlist, ...action.data]
    });
  }
  return state;
};
