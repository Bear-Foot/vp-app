import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v1';
import Dropzone from 'react-dropzone'
import T from 'prop-types'

import {
  filterDone,
  filterError,
  filterLoading,
  filterReset,
  startUploadFiles,
} from '../../redux/files/actions'

import {
  filteredFilesSelector,
} from '../../redux/files/selectors'

const UploadDoneComponent = ({
    files,
    filterDone,
    filterError,
    filterLoading,
    filterReset,
  }) => (
  <div>
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
    this.props.startUploads(files)
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
  startUploads = (files) => {
    this.props.startUploadFiles(files)
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
    startUploadFiles,
  }
)(UploadComponent)
