import { socketInfos } from '../../socket'
import { waitingSelector, ongoingSelector } from './selectors'

export const INITIALIZE_FILES = 'INITIALIZE_FILES'
export const STATUS_LOADING = 'STATUS_LOADING'
export const STATUS_DONE = 'STATUS_DONE'
export const STATUS_ERROR = 'STATUS_ERROR'

export const FILTER_DONE = 'FILTER_DONE'
export const FILTER_ERROR = 'FILTER_ERROR'
export const FILTER_LOADING = 'FILTER_LOADING'
export const FILTER_RESET = 'FILTER_RESET'

const init = files => ({
  type: INITIALIZE_FILES,
  payload: { files }
})

const createActionCreator = status => id => ({ type: status, payload: { id } })
export const startUpload = createActionCreator(STATUS_LOADING)
export const endUpload = createActionCreator(STATUS_DONE)
export const errorUpload = createActionCreator(STATUS_ERROR)

const createFilterCreator = status => () => ({ type: status })
export const filterDone = createFilterCreator(FILTER_DONE)
export const filterError = createFilterCreator(FILTER_ERROR)
export const filterLoading = createFilterCreator(FILTER_LOADING)
export const filterReset = createFilterCreator(FILTER_RESET)

export const startUploadFiles = files => (dispatch, getState) => {
  dispatch(init(files))
  dispatch(uploadParallel)
}

const uploadParallel = (dispatch, getState) => {
  const ongoing = ongoingSelector(getState());
  const waiting = waitingSelector(getState());

  if (ongoing.length < 2 && waiting.length > 0) {
    const fileToUpload = waiting[0]
    console.log(socketInfos);
    socketInfos.socket.emit('uploadStart', { id: socketInfos.id, uploadID: fileToUpload.id })
  }
}

socketInfos.socket.on('progress', () => console.log('progress'))
socketInfos.socket.on('end', () => console.log('end'))
socketInfos.socket.on('error', () => console.log('error'))
