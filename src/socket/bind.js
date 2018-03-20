import { dispatchWhenReceiving } from './client'
import { uploadProgress, endUpload, errorUpload } from '../redux/file/actions'
import { uploadParallel } from '../redux/fileList/actions'

export const plugSocket = dispatchWhenReceiving({
  progress: data => uploadProgress({
    id: data.uploadID,
    progress: data.progress,
  }),
  end: data => dispatch => {
    dispatch(endUpload(data.uploadID))
    dispatch(uploadParallel)
  },
  errors: data => dispatch => {
    dispatch(errorUpload(data.uploadID))
    dispatch(uploadParallel)
  },
})