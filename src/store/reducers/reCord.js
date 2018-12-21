import * as actionTypes from '../constants/reCord'

const initialState = {
  recordInfo: JSON.parse(window.localStorage.getItem('recordInfo'))
}
export default function reCord(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RECORD_SET:
      return action.data
    case actionTypes.RECORD_GET:
      return action.data
    default:
      return state
  }
}
