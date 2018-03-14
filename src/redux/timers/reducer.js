import { createReducer } from '../../utils/createReducer'
import uuid from 'uuid/v1'
import { TIMER_CREATE } from './actions'
import {
  TIMER_START,
  TIMER_TICK,
  TIMER_PAUSE,
  TIMER_RESUME,
} from '../timer/actions'
import { timer } from '../timer/reducer'

const initialState = []

const forwardAction = (state, action) => (
  state.map(timerElem => timerElem.id === action.target ? {
    ...timerElem,
    timer: timer(timerElem.timer, action)
  }: timerElem)
)

const actionHandlers = {
  [TIMER_CREATE]: (state, action) => {
    const nextState = [...state, {
      timer: timer(undefined, action),
      id: uuid(),
    }]
    return nextState
  },
  [TIMER_START]: forwardAction,
  [TIMER_TICK]: forwardAction,
  [TIMER_PAUSE]: forwardAction,
  [TIMER_RESUME]: forwardAction,
}

export const timers = createReducer(actionHandlers, initialState)

export const timersSelector = s => s.timers
