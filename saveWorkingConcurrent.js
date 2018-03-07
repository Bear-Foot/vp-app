import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom'
import createHistory from "history/createBrowserHistory"
import Dropzone from 'react-dropzone'
import uuid from 'uuid/v1'

const history = createHistory()

// Mon IP 10.138.11.112:8000/upload

class Home extends Component {
  state = {
    loading: false,
    result: null,
  }
  componentDidMount() {
    this.setState({ loading: true, result: null })
    fetch('https://randomuser.me/api/')
      .then(data => data.json())
      .then(data => this.setState({ result: data.results[0], loading: false }))
  }
  render() {
    const { result, loading } = this.state

    return (
      <div>
        {!result && !loading && 'Home'}
        {loading && 'Loading'}
        {!loading && result && result.name.first}
        <div>

        </div>
      </div>
    )
  }
}

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
  <Router history={history}>
    <App />
  </Router>
)

export default Providers;
