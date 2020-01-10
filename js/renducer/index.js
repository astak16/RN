import {combineReducers} from "redux"
import theme from "./theme"
/**
 * 1. 合并 reducer
 * @type {Reducer<any>} | Reducer<any,AnyAction>}
 */
const index = combineReducers({
  theme
})
export default index
