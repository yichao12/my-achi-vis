import {combineReducers,applyMiddleware,createStore} from 'redux'

import {personInfo} from './personInfo.redux.js'
import {roomInfo} from './roomInfo.redux.js'
import {dayInfo} from './dayInfo.redux.js'

export default combineReducers({
  personInfo,
  roomInfo,
  dayInfo
})
