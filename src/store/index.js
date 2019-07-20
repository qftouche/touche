import {createStore,applyMiddleware,compose} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
const composeEnxxx = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 创建store实例
const store = createStore(
  reducer,
  composeEnxxx(applyMiddleware(thunk))
)
// 4,将store实例暴露出去
export default store;