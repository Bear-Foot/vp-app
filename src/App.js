import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom'
import createHistory from "history/createBrowserHistory"
import { Provider as StoreProvider } from 'react-redux'

import { Home } from './components/Home'
import { Upload } from './components/Upload'
import { store } from './redux/store'

const history = createHistory()

const Menu = () => (
  <div>
    <Link to="/"> Go to home </Link>
    <Link to="/upload"> Go to uploads </Link>
    <Link to="/upload/done"> Go to done </Link>
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <Switch>
          <Route path='/upload' component={Upload}/>
          <Route path='/' component={Home}/>
        </Switch>
      </div>
    );
  }
}

const Providers = () => (
  <StoreProvider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreProvider>
)

export default Providers;
