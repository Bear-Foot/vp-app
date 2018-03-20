import { socketInfos } from './client'

export const emitActionMiddleware = store => next => action => {
  if (action.type === 'SOCKET') {
    socketInfos.socket.emit(action.payload.messageType, {
      ...action.payload.data,
      id: socketInfos.socket.id,
    })
  }
  else {
    return next(action)
  }
}
