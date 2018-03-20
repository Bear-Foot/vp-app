export const createReducer = (actionHandlers, init, reducerName) => (prevState = init, action) => {
  const handler = actionHandlers[action.type]

  if (typeof prevState === 'function') {
    return prevState(action) // createInitialState ()
  }
  return handler ? handler(prevState, action) : prevState
}
