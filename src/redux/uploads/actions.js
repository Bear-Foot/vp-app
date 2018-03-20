export const UPLOAD_FILTER_LOADING = 'UPLOAD_FILTER_LOADING'
export const UPLOAD_FILTER_DONE = 'UPLOAD_FILTER_DONE'
export const UPLOAD_FILTER_ERROR = 'UPLOAD_FILTER_ERROR'
export const UPLOAD_FILTER_WAITING = 'UPLOAD_FILTER_WAITING'

const createFilterCreator = status => () => ({ type: status })
export const filterDone = createFilterCreator(UPLOAD_FILTER_DONE)
export const filterError = createFilterCreator(UPLOAD_FILTER_ERROR)
export const filterLoading = createFilterCreator(UPLOAD_FILTER_LOADING)
export const filterReset = createFilterCreator(UPLOAD_FILTER_WAITING)