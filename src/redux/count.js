const initialState = 0

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export const countSelector = state => state.oldDemo.count

export const createIncrement = number => ({
  type: INCREMENT,
  payload: {
    number,
  }
})

export const createDecrement = number => ({
  type: DECREMENT,
  payload: {
    number,
  }
})

const actionHandlers = {
  DECREMENT: (state, action) => state - action.payload.number,
  INCREMENT: (state, action) => state + action.payload.number,
}

function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

export const count = reducer
