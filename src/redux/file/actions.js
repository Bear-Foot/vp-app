export const FILE_STATUS_LOADING = 'FILE_STATUS_LOADING'
export const FILE_STATUS_WAITING = 'FILE_STATUS_WAITING'
export const FILE_STATUS_DONE = 'FILE_STATUS_DONE'
export const FILE_STATUS_ERROR = 'FILE_STATUS_ERROR'
export const FILE_PROGRESS = 'FILE_PROGRESS'

const createActionCreator = status => id => ({ type: status, payload: { id } })
export const queueUpload = createActionCreator(FILE_STATUS_WAITING)
export const startUpload = createActionCreator(FILE_STATUS_LOADING)
export const endUpload = createActionCreator(FILE_STATUS_DONE)
export const errorUpload = createActionCreator(FILE_STATUS_ERROR)

export const uploadProgress = ({ id, progress }) => ({
  type: FILE_PROGRESS,
  payload: { progress, id }
})