import { createReducer } from '../../utils/createReducer'

import {
  TIMER_CREATE,
  TIMER_START,
  TIMER_TICK,
  TIMER_PAUSE,
  TIMER_RESUME,
} from './actions'

const initialState = {
  startTime: null,
  elapsedTime: null,
  paused: true,
}

const createInitialState = () => ({
  ...initialState,
})

const actionHandlers = {
  [TIMER_START]: (state, action) => ({
    ...state,
    startTime: Date.now() - (action.payload.init || 0),
    paused: false,
  }),
  [TIMER_TICK]: state => ({ ...state, elapsedTime: Date.now() - state.startTime }),
  [TIMER_PAUSE]: state => ({
    ...state,
    paused: true,
  }),
  [TIMER_RESUME]: state => ({
    ...state,
    startTime: Date.now() - state.elapsedTime,
    paused: false,
  }),
}
export const timer = createReducer(actionHandlers, initialState, 'timerReducer')
