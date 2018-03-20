import uuid from 'uuid/v1'
import { createReducer } from '../utils/createReducer'
// removeOne, removeMany, removeAll, add, update, addOrUpdate, sort

// updatedAt, createdAt

// proposer selecteurs
// getById, getList, lastCreated, lastUpdated

export const createListReducer = ({
  prefix,
  childReducer,
  forwardedActions,
  getIdFromAction,
  sorts = {},
}) => {
  const actions = [
    'ADD',
    'REMOVE_ALL',
    'SORT',
    'REMOVE',
  ]
  const actionsNames = {}
  actions.forEach(actionName => (actionsNames[actionName] = `${prefix}_${actionName}`))
  Object.keys(sorts).forEach(sortName => (actionsNames[sortName] = `${prefix}_${sortName}`))

  const actionsHandlers = {
    [actionsNames.ADD]: (state, action) => [...state, { data: childReducer(undefined, action), id: uuid()}],
    [actionsNames.REMOVE_ALL]: () => [],
    [actionsNames.REMOVE]: (state, action) => state.filter(elem => {
      return !getIdFromAction(action).find(id => id === elem.id)
    })
  }

  forwardedActions.forEach(actionName => {
    actionsHandlers[actionName] =  (state, action) => state.map(elem => {
      return elem.id !== getIdFromAction(action) ? elem : {
        ...elem,
        data: childReducer(elem.data, action),
      }
    })
  })

  Object.keys(sorts).forEach(sortKey => {
    actionsHandlers[`${prefix}_${sortKey}`] = (state, action) => {
      const newState = state.slice()
      newState.sort((a, b) => sorts[sortKey](a.data, b.data))
      return newState
    }
  })


  const initialState = []

  return {
    reducer: createReducer(actionsHandlers, initialState),
    selectors: {},
    actions: actionsNames,
  }
}
