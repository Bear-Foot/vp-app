export const createReducer = (actionHandlers, init, reducerName) => (state = init, action) => {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
