import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import styled from 'styled-components'

import { Home } from './components/Home'
import { Upload } from './components/Upload'
import { Timers } from './components/Timers'
import { Timer } from './components/Timer'

const Menu = () => (
  <MenuWrapper>
    <Link to="/"><Line > Go to home </Line></Link>
    <Link to="/timer"><Line> Go to timer </Line></Link>
    <Link to="/timers"><Line> Go to timerS </Line></Link>
    <Link to="/upload"><Line> Go to uploads </Line></Link>
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
  padding: 5px;
  text-decoration: none;
  display: inline-block;
  color: white;
  &:hover{
    color: yellow;
  }
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
