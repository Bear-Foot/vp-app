import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { count } from './count'
import { random } from './random'
import { files } from './files'
import { timers } from './timers/reducer'
import { timer } from './timer/reducer'

const oldDemo = combineReducers({
  count, random,
})

const reducer = combineReducers({
  oldDemo,
  files,
  timers,
  timer: (state, action) => action.target ? state : timer(state, action),
})

const devToolMiddleWare = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(
  reducer,
  devToolMiddleWare,
  applyMiddleware(thunk),
);

// store.subscribe(() => console.log(store.getState()))
