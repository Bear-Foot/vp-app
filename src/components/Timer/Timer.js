import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { timeSelector, elapsedTimeSelector } from '../../redux/timer/selectors'
import { timerById } from '../../redux/timers/selectors'
import { pauseTimer, resumeTimer, startTimer } from '../../redux/timer/actions'
import { startTimerById, pauseTimerById, resumeTimerById } from '../../redux/timers/actions'

const formatTime = time => `${Math.floor(time / 60000)}:${Math.floor(time / 1000)}:${time % 1000}`

const TimerComponent = ({ startTimer, time, pauseTimer, resumeTimer }) => {
  return (
    <div style={{display: 'flex', padding: 10}}>
      <div style={{width: 70}}> {time} </div>
      <div><button onClick={startTimer}> Start ! </button></div>
      <div><button onClick={pauseTimer}> Pause ! </button></div>
      <div><button onClick={resumeTimer}> Resume ! </button></div>
    </div>
  )
}

export const TimerWithId = connect((state, ownProps) => {
  const time = formatTime(elapsedTimeSelector(timerById(ownProps.id)(state)))
  return {
    time,
  }
},
(dispatch, { id }) => {
  return {
    startTimer: () => dispatch(startTimer(id)),
    pauseTimer: () => dispatch(pauseTimer(id)),
    resumeTimer: () => dispatch(resumeTimer(id)),
  }
})(TimerComponent)

export const Timer = connect(state => ({
  time: formatTime(timeSelector(state)),
}), {
  startTimer: () => startTimer(),
  pauseTimer: () => pauseTimer(),
  resumeTimer: () => resumeTimer(),
})(TimerComponent)
