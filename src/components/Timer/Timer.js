import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { timeSelector, elapsedTimeSelector, timerStatusSelector } from '../../redux/timer/selectors'
import { timerById, timerStatusSelectorById } from '../../redux/timers/selectors'
import { pauseTimer, resumeTimer, startTimer } from '../../redux/timer/actions'
import { startTimerById, pauseTimerById, resumeTimerById } from '../../redux/timers/actions'

const formatTime = time => `${Math.floor(time / 60000)}:${Math.floor(time / 1000)}:${time % 1000}`

const TimerComponent = ({ className, startTimer, time, status, pauseTimer, resumeTimer }) => {
  return (
    <Wrapper className={className} >
      <Time> {time} </Time>
      <ButtonWrapper><Button status={status} onClick={startTimer}> Start ! </Button></ButtonWrapper>
      <ButtonWrapper><Button status={!status} onClick={pauseTimer}> Pause ! </Button></ButtonWrapper>
      <ButtonWrapper><Button status={status} onClick={resumeTimer}> Resume ! </Button></ButtonWrapper>
    </Wrapper>
  )
}

export const TimerWithId = connect((state, ownProps) => {
  const time = formatTime(elapsedTimeSelector(timerById(ownProps.id)(state)))
  return {
    time,
    status: timerStatusSelectorById(ownProps.id)(state)
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
  status: timerStatusSelector(state),
}), {
  startTimer: () => startTimer(),
  pauseTimer: () => pauseTimer(),
  resumeTimer: () => resumeTimer(),
})(TimerComponent)

const Button = styled.button`
  display: block;
  ${props => props.status ? '' : 'color: grey'}
  &:hover {
    color: red;
  }
  margin: 15px;
`

const ButtonWrapper = styled.div`
`

const Wrapper = styled.div`
  padding: 10px;
`

const Time = styled.div`
  width: 70px;
  color: ${({ theme }) => theme.main};
  ${Wrapper}:hover & {
    font-weight: 700;
  }
`
