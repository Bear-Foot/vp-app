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
}
