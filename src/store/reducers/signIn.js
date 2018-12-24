import * as actionTypes from '../constants/signIn'

const initialState = {
  authToken: window.localStorage.getItem('authToken'),
  userInfo: {}
}
export default function signIn(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return Object.assign({}, state, action.data)
    case actionTypes.USER_INFO_SET:
      return Object.assign({}, state, action.data)
    case actionTypes.USER_INFO_GET:
      return Object.assign({}, state, action.data)
    case actionTypes.UPDATE_USER_INFO:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}
