import { createListReducer } from '../list'
import { fileReducer } from '../file/reducer'

import {
  FILE_STATUS_LOADING,
  FILE_STATUS_WAITING,
  FILE_STATUS_DONE,
  FILE_STATUS_ERROR,
  FILE_PROGRESS,
} from '../file/actions'

const fileListObj = createListReducer({
  getIdFromAction: a => a.payload.id,
  forwardedActions: [FILE_STATUS_LOADING, FILE_STATUS_WAITING, FILE_STATUS_DONE, FILE_STATUS_ERROR, FILE_PROGRESS],
  childReducer: fileReducer,
  prefix: 'FILE_LIST',
})

export const fileListReducer = fileListObj.reducer
export const actions = fileListObj.actions
