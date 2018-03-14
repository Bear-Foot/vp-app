import {
  timerStatusSelector,
} from './selectors'
import {
  timerById,
} from '../timers/selectors'

export const TIMER_START = 'TIMER_START'
export const start = (init, id) => ({ type: TIMER_START, payload: { init }, target: id })

export const TIMER_TICK = 'TIMER_TICK'
export const tick = id => ({ type: TIMER_TICK, target: id })

export const TIMER_PAUSE = 'TIMER_PAUSE'
export const pauseTimer = id => ({ type: TIMER_PAUSE, target: id })

export const TIMER_RESUME = 'TIMER_RESUME'
export const resume = id => ({ type: TIMER_RESUME, target: id })

export const startTimer = (id) => (dispatch, getState) => {
  dispatch(start(null, id))
  dispatch(tickTimer(id))
}

export const resumeTimer = id => dispatch => {
  dispatch(resume(id))
  dispatch(tickTimer(id))
}

const tickTimer = id => (dispatch, getState) => {
  setTimeout(() => {
    console.log(id);
    const paused = id ? timerById(id)(getState()).paused : timerStatusSelector(getState())
    if (!paused) {
      dispatch(tick(id))
      dispatch(tickTimer(id))
    }
  }, 50)
}
