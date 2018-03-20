import { waitingSelector, ongoingSelector } from './selectors'
import { actions } from './reducer'
import { startUpload } from '../file/actions'


export const startUploadFiles = files => (dispatch, getState) => {
  files.forEach(file => {
    dispatch({
      type: actions.ADD,
      payload: { file },
    })
  })
  dispatch(uploadParallel)
}

export const uploadParallel = (dispatch, getState) => {
  const ongoing = ongoingSelector(getState());
  const waiting = waitingSelector(getState());

  if (ongoing.length < 2 && waiting.length > 0) {
    const fileToUpload = waiting[0]
    dispatch(startUpload(fileToUpload.id))
    dispatch({
      type: 'SOCKET',
      payload: {
        messageType: 'uploadStart',
        data: { uploadID: fileToUpload.id }
      }
    })
    dispatch(uploadParallel)
  }
}
