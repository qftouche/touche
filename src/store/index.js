import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import order  from "./modules/order/renders";
const composeEnxxx = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 创建store实例
const store = createStore(
  combineReducers({
    order
  }),
  composeEnxxx(applyMiddleware(thunk))
)
// 4,将store实例暴露出去
export default store;