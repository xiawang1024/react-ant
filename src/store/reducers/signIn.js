import * as actionTypes from '../constants/signIn'

const initialState = {
  authToken: window.localStorage.getItem('authToken')
}
export default function signIn(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return action.data
    case actionTypes.UPDATE_USER_INFO:
      return action.data
    default:
      return state
  }
}
