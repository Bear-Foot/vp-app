import React from 'react'
import styled from 'styled-components'

export const File = ({ file }) => {
  return (
    <StyledFile status={file.status}>
      <div>
        {file.name}
      </div>
      <div>
        {file.status} {file.status === 'loading' && `- ${file.progress} %`}
      </div>
    </StyledFile>
  )
}

const colorMap = {
  done: '#afc',
  loading: '#acf',
  error: '#fbb',
  waiting: '#ddd',
}

const StyledFile = styled.div`
  background: ${props => colorMap[props.status]};
  padding: 10px;
`
