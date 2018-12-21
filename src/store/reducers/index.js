import { combineReducers } from 'redux'

import signIn from './signIn.js'
import reCord from './reCord.js'

const rootReducer = combineReducers({
  signIn,
  reCord
})

export default rootReducer
