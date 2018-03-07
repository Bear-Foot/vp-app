import { createStore, combineReducers } from 'redux'

import { count } from './count'
import { random } from './random'

const reducer = combineReducers({
  count,
  random,
})

export const store = createStore(reducer);

console.log(store.getState());
