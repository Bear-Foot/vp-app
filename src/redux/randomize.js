const initialState = Math.random()

export const RANDOMIZE = 'RANDOMIZE'

export const createRandomize = () => ({
  type: RANDOMIZE,
})

const actionHandlers = {
  RANDOMIZE: () => Math.random(),
}

function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

export const random = reducer
