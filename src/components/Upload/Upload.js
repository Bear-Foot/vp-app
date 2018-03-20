import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'

import {
  startUploadFiles,
} from '../../redux/fileList/actions'

import {
  ongoingSelector,
  doneSelector,
  errorSelector,
  waitingSelector,
} from '../../redux/fileList/selectors'

import { File } from '../File'

const UploadPanelComponent = ({
  waitingFiles,
  ongoingFiles,
  errorFiles,
  doneFiles,
}) => (
  <Wrapper>
    <FileList>
      {
        waitingFiles.length ?
          waitingFiles.map(file => (
            <File key={file.id} file={file.data} />
          )
        ): 'No files queued'
      }
    </FileList>
    <FileList>
      {
        ongoingFiles.length ?
          ongoingFiles.map(file => (
            <File key={file.id} file={file.data} />
          )
        ): 'No files being uploaded'
      }
    </FileList>
    <FileList>
      {
        errorFiles.length ?
          errorFiles.map(file => (
            <File key={file.id} file={file.data} />
          )
        ): 'No files failed'
      }
    </FileList>
    <FileList>
      {
        doneFiles.length ?
          doneFiles.map(file => (
            <File key={file.id} file={file.data} />
          )
        ): 'No files done'
      }
    </FileList>
  </Wrapper>
)

const FileList = styled.div`
  width: 25%;
`
const Wrapper = styled.div`
  display: flex;
`

const UploadPanel = connect(
  state => ({
    waitingFiles: waitingSelector(state),
    ongoingFiles: ongoingSelector(state),
    errorFiles: errorSelector(state),
    doneFiles: doneSelector(state),
  }),
)(UploadPanelComponent)

class UploadDefault extends Component {
  onDrop = (files) => {
    this.props.startUploads(files)
  }
  render() {
    return (
      <DropWrapper>
        <Dropzone
          onDrop={this.onDrop}
          style={{
            padding: 10,
          }}
        >
          Drop files here...
        </Dropzone>
      </DropWrapper>
    )
  }
}

const DropWrapper = styled.div`
  height: 40px;
  background: #9fb;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background: #6c9;
  }
`

class UploadComponent extends Component {
  startUploads = (files) => {
    this.props.startUploadFiles(files)
  }
  render() {
    return (
        <div>
          <UploadDefault startUploads={this.startUploads} />
          <UploadPanel />
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
