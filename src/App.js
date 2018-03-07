import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom'
import createHistory from "history/createBrowserHistory"
import Dropzone from 'react-dropzone'
import uuid from 'uuid/v1'
import { Provider as StoreProvider } from 'react-redux'

import { Home } from './components/Home'
import { store } from './redux/store'

const history = createHistory()

const UploadDone = ({ files }) => files.map(file => (
  <div key={file.id}>
    {file.name} -- {file.status}
  </div>
))

class UploadDefault extends Component {
  onDrop = (files) => {
    this.props.startUploads(files.map(file => ({
        name: file.name,
        id: uuid(),
      })),
      files,
    )
  }
  render() {
    return (
      <Dropzone
        onDrop={this.onDrop}
        style={{height: 40}}
      >
        Drop files here...
      </Dropzone>
    )
  }
}
function modifyItem(list, id, updateFunc) {
  return list.map(elem => elem.id === id ? updateFunc(elem) : elem)
}

class Upload extends Component {
  state = {
    files: []
  }
  startUploads = (files, droppedFiles) => {
    this.setState({
      files,
    }, () => this.uploadFiles(droppedFiles))
  }
  uploadFiles = (droppedFiles) => {
    const { files } = this.state
    files.forEach((fileToUpload, i) => {
      this.setState(oldState => {
        const { files } = oldState
        const newFiles = modifyItem(files, fileToUpload.id, item => ({ ...item, status: 'ongoing' }))
        const formData = new FormData();

        formData.append('file', droppedFiles[i])
        fetch('http://10.138.11.112:8000/upload', {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            if (response.ok) {
              this.setState(oldState => {
                const { files } = oldState
                const newFiles = modifyItem(files, fileToUpload.id, item => ({ ...item, status: 'done' }))
                return {
                  files: newFiles
                }
              })
            } else {
              this.setState(oldState => {
                const { files } = oldState
                const newFiles = modifyItem(files, fileToUpload.id, item => ({ ...item, status: 'error' }))
                return {
                  files: newFiles
                }
              })
            }
          })

        return {
          files: newFiles,
        }
      })
    })
  }
  render() {
    return (
        <div>
          <UploadDefault startUploads={this.startUploads} />
          <UploadDone files={this.state.files} />
        </div>
    )
  }
}

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
