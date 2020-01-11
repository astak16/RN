import {combineReducers} from "redux"
import theme from "./theme"
import popular from "./popular"
import {rootCome,RootNavigator} from "../navigator/AppNavigators"



/**
 * 1. 合并 reducer
 * @type {Reducer<any>} | Reducer<any,AnyAction>}
 */
const index = combineReducers({
  theme,
  popular
})
export default index
