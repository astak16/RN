import {applyMiddleware,createStore} from "redux"
import thunk from "redux-thunk"
import reducers from "../renducer"

const middlewares = [
  thunk
]

/**
 * 2. 创建 store
 */
export default createStore(reducers,applyMiddleware(...middlewares))
