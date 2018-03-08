import { createStore, combineReducers } from 'redux'

import { count } from './count'
import { random } from './random'
import { files } from './files'

const oldDemo = combineReducers({
  count, random,
})

const reducer = combineReducers({
  oldDemo,
  files,
})

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store.subscribe(() => console.log(store.getState()))
