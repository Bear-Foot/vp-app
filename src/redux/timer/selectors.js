
export const timerSelector = state => state.timer
export const timeSelector = state => timerSelector(state).elapsedTime
export const timerStatusSelector = state => timerSelector(state).paused
export const elapsedTimeSelector = timer => timer.elapsedTime
