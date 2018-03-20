import { combineReducers } from 'redux'

import { createReducer } from '../../utils/createReducer'
import { fileListReducer } from '../fileList/reducer';

import {
  UPLOAD_FILTER_LOADING,
  UPLOAD_FILTER_DONE,
  UPLOAD_FILTER_ERROR,
  UPLOAD_FILTER_WAITING,
} from './actions'

const initialState = ''

const actionsHandler = {
  [UPLOAD_FILTER_DONE]: () => 'done',
  [UPLOAD_FILTER_LOADING]: () => 'loading',
  [UPLOAD_FILTER_ERROR]: () => 'error',
  [UPLOAD_FILTER_WAITING]: () => 'waiting',
}

const filterReducer = createReducer(actionsHandler, initialState)

export const uploads = combineReducers({
  fileList: fileListReducer,
  filter: filterReducer,
})
