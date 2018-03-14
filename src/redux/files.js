import { createSelector } from 'reselect'
import uuid from 'uuid/v1'
import { createReducer } from '../utils/createReducer'

const initialState = {
  files: [],
  filter: null,
}
export const filesSelector = state => state.files.files
export const filterSelector = state => state.files.filter

export const ongoingSelector = state => filesSelector(state).filter(file => file.status === 'loading').length
export const memoizedOngoingSelector = createSelector(
  filesSelector,
  files => files.filter(file => file.status === 'loading').length
)

export const filteredFilesSelector = createSelector(
  filesSelector,
  filterSelector,
  (files, filter) => files.filter(file => console.log('testset') || file.status === filter || !filter),
)

export const INITIALIZE_FILES = 'INITIALIZE_FILES'
export const STATUS_LOADING = 'STATUS_LOADING'
export const STATUS_DONE = 'STATUS_DONE'
export const STATUS_ERROR = 'STATUS_ERROR'

export const FILTER_DONE = 'FILTER_DONE'
export const FILTER_ERROR = 'FILTER_ERROR'
export const FILTER_LOADING = 'FILTER_LOADING'
export const FILTER_RESET = 'FILTER_RESET'

export const initialize = files => ({
  type: INITIALIZE_FILES,
  payload: { files },
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

const fileReducer = createReducer(fileActionHandlers)

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
