import * as actionTypes from '../constants/signIn'

export const login = data => {
  return {
    type: actionTypes.USER_LOGIN,
    data
  }
}

export const setUserInfo = data => {
  return {
    type: actionTypes.USER_INFO_SET,
    data
  }
}
export const getUserInfo = data => {
  return {
    type: actionTypes.USER_INFO_GET,
    data
  }
}

export const updateUserInfo = data => {
  return {
    type: actionTypes.UPDATE_USER_INFO,
    data
  }
}
