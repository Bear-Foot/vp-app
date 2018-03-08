import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v1';
import Dropzone from 'react-dropzone'

import { countSelector } from '../../redux/count'
import {
  endUpload,
  startUpload,
  errorUpload,
  initialize,
  filterDone,
  filterError,
  filterLoading,
  filterReset,
  filteredFilesSelector,
} from '../../redux/files'

const UploadDoneComponent = ({
    files,
    count,
    filterDone,
    filterError,
    filterLoading,
    filterReset,
  }) => (
  <div>
    {count}
    <button onClick={filterReset}> None </button>
    <button onClick={filterDone}> Done </button>
    <button onClick={filterError}> Error </button>
    <button onClick={filterLoading}> Loading </button>
    {
      files
        .map(file => (
          <div key={file.id}>
            {file.name} -- {file.status}
          </div>
        )
      )
    }
  </div>
)

const UploadDone = connect(
  state => ({
    files: filteredFilesSelector(state),
    count: countSelector(state),
  }),
  {
    filterDone,
    filterError,
    filterLoading,
    filterReset,
  }
)(UploadDoneComponent)

class UploadDefault extends Component {
  onDrop = (files) => {
    const newFiles = files.map(file => ({
      data: file,
      id: uuid(),
      name: file.name,
    }))
    this.props.startUploads(newFiles)
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

class UploadComponent extends Component {
  state = {
    files: []
  }
  startUploads = (files) => {
    this.props.initialize(files.map(file => ({ id: file.id, name: file.name })))
    this.uploadFiles(files)
  }
  uploadFiles = (files) => {
    files.forEach((fileToUpload, i) => {

      const formData = new FormData();
      formData.append('file', fileToUpload.data)

      this.props.startUpload(fileToUpload.id)
      fetch('http://10.138.11.112:8000/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            this.props.endUpload(fileToUpload.id)
          } else {
            this.props.errorUpload(fileToUpload.id)
          }
        })
    })
  }
  render() {
    return (
        <div>
          <UploadDefault startUploads={this.startUploads} />
          <UploadDone />
        </div>
    )
  }
}

export const Upload = connect(
  null,
  {
    endUpload,
    startUpload,
    errorUpload,
    initialize,
  }
)(UploadComponent)
