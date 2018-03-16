// removeOne, removeMany, removeAll, add, update, addOrUpdate, sort

// proposer selecteurs
// getById, getList, lastCreated, lastUpdated

// const timerListReducer = createListReducer({
//   childReducer: timerReducer,
//   forwardedActions: [...timerActions],
//   prefix: 'TIMER',
// })
//
// const userListReducer = createListReducer({
//   childReducer: userReducer,
//   forwardedActions: [...userActions],
//   prefix: 'USER',
// })
import { createListReducer } from './list'

const childReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload.amount
    case 'DECREMENT':
      return state - action.payload.amount
    default:
      return state
  }
}

describe('List reducer', () => {
  const result = createListReducer({
    childReducer,
    prefix: 'COUNT',
    forwardedActions: ['INCREMENT', 'DECREMENT'],
    getIdFromAction: a => a.id,
    sorts: {
      deLaPlusBelleAuxAutres: (a, b) => a - b,
    }
  })
  const { actions, reducer, selectors } = result;

  const stateWithOneAdd = reducer([], { type: actions.ADD})
  const stateWithTwoAdd = reducer(stateWithOneAdd, { type: actions.ADD})
  const stateWithTwoDifferent = reducer(stateWithTwoAdd, {
    type: 'INCREMENT',
    payload: { amount: 5 },
    id: stateWithOneAdd[0].id,
  })
  const sortedTwoDifferent = stateWithTwoDifferent.slice()
  sortedTwoDifferent.sort((a, b) => a.data - b.data)

  it('it should return an object', () => {
    expect(typeof result).toBe('object')
  })
  it('it should return an object with actions prefixed', () => {
    expect(actions).toEqual({
      REMOVE: 'COUNT_REMOVE',
      REMOVE_ALL: 'COUNT_REMOVE_ALL',
      ADD: 'COUNT_ADD',
      SORT: 'COUNT_SORT',
      deLaPlusBelleAuxAutres: 'COUNT_deLaPlusBelleAuxAutres',
    })
  })
  it('it should return an object with a function in reducer key', () => {
    expect(typeof reducer).toBe('function')
  })
  it('it should return an object with a map of selectors', () => {
    expect(typeof selectors).toBe('object')
  })

  it('should add an element when the correct action', () => {
    expect(stateWithOneAdd.length).toBe(1)
    expect(stateWithOneAdd[0].data).toBe(0)
    expect(stateWithOneAdd[0].id).toBeDefined()
  })

  it('should forward actions properly to the childReducer', () => {
    expect(reducer(stateWithOneAdd, {
      type: 'INCREMENT',
      payload: { amount: 5 },
      id: stateWithOneAdd[0].id,
    })[0].data).toBe(5)
  })

  it('should return an empty list when removing all', () => {
    expect(reducer(stateWithOneAdd, {
      type: actions.REMOVE_ALL,
    })).toEqual([])
  })

  it('should strip some elements from the list', () => {
    expect(reducer(stateWithOneAdd, {
      type: actions.REMOVE,
      id: [stateWithOneAdd[0].id]
    })).toEqual([])
  })

  it('should sort according to the sorting methods passed earlier on', () => {
    expect(reducer(stateWithTwoDifferent, {
      type: actions.deLaPlusBelleAuxAutres,
    })).toEqual(sortedTwoDifferent)
  })

})
