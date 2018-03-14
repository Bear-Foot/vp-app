import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v1';
import Dropzone from 'react-dropzone'
import T from 'prop-types'

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
import { upload } from '../../requests/upload'

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

const fileType = T.shape({
  name: T.string.isRequired,
  status: T.number.isRequired,
})

UploadDoneComponent.propTypes = {
  files: T.arrayOf(fileType),
}

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
  state = {
    files: []
  }
  startUploads = (files) => {
    files.forEach(this.props.upload)
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
    initialize,
    upload,
  }
)(UploadComponent)
