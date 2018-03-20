import { createReducer } from '../../utils/createReducer'

import {
  FILE_STATUS_ERROR,
  FILE_STATUS_LOADING,
  FILE_STATUS_DONE,
  FILE_STATUS_WAITING,
  FILE_PROGRESS,
} from './actions'

const createInitialState = action => {
  const { file } = action.payload
  return {
    data: file,
    name: file.name,
    status: 'waiting',
    progress: 0,
  }
}

const fileStatusHandler = status => file => ({
  ...file,
  status,
})

const fileActionHandlers = {
  [FILE_STATUS_ERROR]: fileStatusHandler('error'),
  [FILE_STATUS_LOADING]: fileStatusHandler('loading'),
  [FILE_STATUS_DONE]: fileStatusHandler('done'),
  [FILE_STATUS_WAITING]: fileStatusHandler('waiting'),
  [FILE_PROGRESS]: (state, action) => ({
    ...state, progress: action.payload.progress,
  })
}

export const fileReducer = createReducer(fileActionHandlers, createInitialState)
