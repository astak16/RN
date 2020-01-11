import Types from "../../action/types"
import {createStore} from "redux";
import {Type} from "react-native/ReactCommon/hermes/inspector/tools/msggen/src/Type";

const defaultState = {}

/**
 * popular: {
 *   java: {
 *     items: [],
 *     isLoading: false
 *   },
 *   ios: {
 *     items: [],
 *     isLoading: false
 *   }
 * }
 * 0. state树横向扩展
 * 1. 如何动态的设置store，和动态获取store（难点：store key不固定）
 * @param state
 * @param action
 * @returns {{}|{theme: *}}
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.LOAD_POPULAR_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,
          isLoading: false
        },
      }
    case Types.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true
        }
      }
    case Types.LOAD_POPULAR_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false
        }
      }
    default:
      return state
  }
}