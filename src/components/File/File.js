import React from 'react'

export const File = ({ file }) => {
  return (
    <div>
      {file.name} -- {file.status} -- {file.progress}%
    </div>
  )
}