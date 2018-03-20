import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { plugSocket } from '../socket/bind'

import { emitActionMiddleware } from '../socket/middleware'
import { count } from './count'
import { random } from './random'
import { timers } from './timers/reducer'
import { timer } from './timer/reducer'
import { uploads } from './uploads/reducer'

const oldDemo = combineReducers({
  count,
  random,
})

const reducer = combineReducers({
  oldDemo,
  uploads,
  timers,
  timer: (state, action) => action.target ? state : timer(state, action),
})

const devToolMiddleWare = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(
  reducer,
  devToolMiddleWare,
  applyMiddleware(thunk, emitActionMiddleware),
);

plugSocket(store)