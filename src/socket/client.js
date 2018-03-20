import io from 'socket.io-client'

const socket = io('http://localhost:9000');

export const socketInfos = {
  id: null,
  socket,
}

socket.on('id', id => (socketInfos.id = id))

export const dispatchWhenReceiving = options => store => {
  Object.keys(options).forEach(event => {
    socket.on(event, data => console.log(event, data) || store.dispatch(options[event](data)))
  })
}

// socket.emit('uploadStart', { id, uploadID })
// socket.on('progress', ({ id, uploadID, progress /* 0-100 */  }))
// socket.on('end', ({ id, uploadID }))
// socket.on('error', ({ id, uploadID }))
