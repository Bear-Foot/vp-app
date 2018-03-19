import { createSelector } from 'reselect'

export const filesSelector = state => state.files.files
export const filterSelector = state => state.files.filter

export const ongoingSelector = state => filesSelector(state).filter(file => file.status === 'loading')
export const waitingSelector = state => filesSelector(state).filter(file => file.status === 'waiting')
export const memoizedOngoingSelector = createSelector(
  filesSelector,
  files => files.filter(file => file.status === 'loading').length
)

export const filteredFilesSelector = createSelector(
  filesSelector,
  filterSelector,
  (files, filter) => files.filter(file => file.status === filter || !filter),
)
