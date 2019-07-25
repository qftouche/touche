const initstate = {
  orderlist: []
};

export default (state = initstate, action) => {
  if (action.type === "initorderlist") {
    return Object.assign({}, state, {
      orderlist: [...state.orderlist, ...action.data]
    });
  }
  return state;
};
