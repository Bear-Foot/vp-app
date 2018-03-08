import { createSelector } from 'reselect'

const initialState = {
  files: [],
  filter: null,
}
export const filesSelector = state => state.files.files
export const filterSelector = state => state.files.filter

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

const statusHandler = status => (state, { payload: { id }}) => ({
  ...state,
  files: state.files.map(
    file => (id === file.id ? {...file, status } : file)
  )
})

const filterHandler = status => state => ({
   ...state,
   filter: status
 })

const actionHandlers = {
  [INITIALIZE_FILES]: (state, action) => ({
    ...state,
    files: action.payload.files
  }),
  [STATUS_LOADING]: statusHandler('loading'),
  [STATUS_DONE]: statusHandler('done'),
  [STATUS_ERROR]: statusHandler('error'),
  [FILTER_DONE]: filterHandler('done'),
  [FILTER_ERROR]: filterHandler('error'),
  [FILTER_LOADING]: filterHandler('loading'),
  [FILTER_RESET]: filterHandler(null),
}

function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

export const files = reducer
