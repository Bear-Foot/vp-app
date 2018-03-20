import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

import {
  filterDone,
  filterError,
  filterLoading,
  filterReset,
} from '../../redux/uploads/actions'

import {
  startUploadFiles,
} from '../../redux/fileList/actions'

import {
  filteredFilesSelector,
} from '../../redux/fileList/selectors'

import { File } from '../File'

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
          <File key={file.id} file={file.data} />
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
