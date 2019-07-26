// 员工页面的数据

const initstate = {
    userlist : []
}

export default (state = initstate , action )=>{
    if(action.type === 'adduser'){
        return Object.assign({},state,{ userlist : [ ...state.userlist , action.userlist ] })
    }
    if(action.type==='initlist'){
        return Object.assign({},state,{ userlist : [ ...state.userlist , ...action.userlist ] })
    }
    return state
}