import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import styled from 'styled-components'

import { Home } from './components/Home'
import { Upload } from './components/Upload'
import { Timers } from './components/Timers'
import { Timer } from './components/Timer'

const Menu = () => (
  <MenuWrapper>
    <Line><Link to="/"> Go to home </Link></Line>
    <Line><Link to="/timer"> Go to timer </Link></Line>
    <Line><Link to="/timers"> Go to timerS </Link></Line>
    <Line><Link to="/upload"> Go to uploads </Link></Line>
    <Line><Link to="/upload/done"> Go to done </Link></Line>
  </MenuWrapper>
)

const MenuWrapper = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  background: seagreen;
  box-sizing: border-box;
  padding: 5px;
  height: ${({ theme }) => theme.menuHeight}px;
`

const Line = styled.div`
  background: #ccc;
  margin: 5px;
`

export class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Menu />
        <MenuPadder>
          <Switch>
            <Route exact path='/upload' component={Upload}/>
            <Route exact path='/timers' component={Timers}/>
            <Route exact path='/timer' component={Timer}/>
            <Route path='/' component={Home}/>
          </Switch>
        </MenuPadder>
      </AppWrapper>
    )
  }
}

const MenuPadder = styled.div`
  padding-top: ${({ theme }) => theme.menuHeight}px;
`

const AppWrapper = styled.div`
  height: 2000px;
`
