import uuid from 'uuid/v1'
import { createReducer } from '../../utils/createReducer'

import {
  INITIALIZE_FILES,
  STATUS_LOADING,
  STATUS_DONE,
  STATUS_ERROR,
  FILTER_DONE,
  FILTER_ERROR,
  FILTER_LOADING,
  FILTER_RESET,
} from './actions'

const initialState = {
  files: [],
  filter: null,
}


const fileReducer = createReducer(fileActionHandlers)

const filterHandler = status => state => ({
  ...state,
  filter: status
})

const fileStatusHandler = status => file => ({
  ...file,
  status
})

const fileActionHandlers = {
  [STATUS_ERROR]: fileStatusHandler('error'),
  [STATUS_LOADING]: fileStatusHandler('loading'),
  [STATUS_DONE]: fileStatusHandler('done'),
}

const statusHandler = status => (state, action) => ({
  ...state,
  files: state.files.map(
    file => (action.payload.id === file.id ? fileReducer(file, action) : file)
  )
})

const actionHandlers = {
  [INITIALIZE_FILES]: (state, action) => ({
    ...state,
    files: action.payload.files.map(file => ({
      id: uuid(),
      name: file.name,
      data: file,
      progress: 0,
      status: 'waiting',
    })),
  }),
  [STATUS_ERROR]: statusHandler('error'),
  [STATUS_LOADING]: statusHandler('loading'),
  [STATUS_DONE]: statusHandler('done'),
  [FILTER_DONE]: filterHandler('done'),
  [FILTER_ERROR]: filterHandler('error'),
  [FILTER_LOADING]: filterHandler('loading'),
  [FILTER_RESET]: filterHandler(null),
}


export const files = createReducer(actionHandlers, initialState)
