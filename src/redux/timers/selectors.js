export const timerById = id => state => state.timers.find(timerElem => timerElem.id === id).timer
export const timerStatusSelectorById = id => state => timerById(id)(state).paused
