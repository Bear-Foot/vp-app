import { createSelector } from 'reselect'

import { uploadsSelector } from '../uploads/selectors'

export const filesSelector = state => uploadsSelector(state).fileList
export const filterSelector = state => uploadsSelector(state).filter

const createFilteredFilesSelector = filter => createSelector(
  filesSelector,
  files => files.filter(file => file.data.status === filter)
)

export const ongoingSelector = createFilteredFilesSelector('loading')
export const waitingSelector = createFilteredFilesSelector('waiting')
export const errorSelector = createFilteredFilesSelector('error')
export const doneSelector = createFilteredFilesSelector('done')

export const filteredFilesSelector = createSelector(
  filesSelector,
  filterSelector,
  (files, filter) => files.filter(file => file.status === filter || !filter),
)
