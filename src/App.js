import React, { Component } from 'react'
import { Router, Route, Switch, Link } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { Provider as StoreProvider } from 'react-redux'

import { Home } from './components/Home'
import { Upload } from './components/Upload'
import { Timers } from './components/Timers'
import { Timer } from './components/Timer'
import { store } from './redux/store'
import { MyStore, CustomProvider } from './CustomStore'

const history = createHistory()

const Menu = () => (
  <div>
    <div><Link to="/"> Go to home </Link></div>
      <div><Link to="/timer"> Go to timer </Link></div>
    <div><Link to="/timers"> Go to timerS </Link></div>
    <div><Link to="/upload"> Go to uploads </Link></div>
    <div><Link to="/upload/done"> Go to done </Link></div>
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <Switch>
          <Route exact path='/upload' component={Upload}/>
            <Route exact path='/timers' component={Timers}/>
          <Route exact path='/timer' component={Timer}/>
          <Route path='/' component={Home}/>
        </Switch>
      </div>
    )
  }
}

const Providers = () => (
  <StoreProvider store={store}>
    <CustomProvider store={MyStore}>
      <Router history={history}>
        <App />
      </Router>
    </CustomProvider>
  </StoreProvider>
)

export default Providers
