import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { TimerWithId } from '../Timer'
import { timersSelector } from '../../redux/timers/reducer'
import { createTimer } from '../../redux/timers/actions'

const TimersComponent = ({ timers, createTimer }) => {
  return (
    <div>
      <button onClick={createTimer}> Create Timer </button>
      {timers.length ? timers.map(
        timer => <Timer key={timer.id} id={timer.id} />
      ) : 'There are no timers to display'}
    </div>
  )
}

const Timer = styled(TimerWithId)`
  background: tomato;
`

export const Timers = connect(
  state => ({
    timers: timersSelector(state),
  }),
  {
    createTimer
  }
)(TimersComponent)
