import * as actionTypes from '../constants/reCord'

export const setCord = data => {
  return {
    type: actionTypes.RECORD_SET,
    data
  }
}

export const getCord = data => {
  return {
    type: actionTypes.RECORD_GET,
    data
  }
}
