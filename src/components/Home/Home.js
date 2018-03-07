import React from 'react'
import { connect } from 'react-redux'

import { createIncrement, createDecrement } from '../../redux/count'
import { createRandomize } from '../../redux/random'

const HomeComponent = ({ count, random, decrement, increment, randomize }) => (
  <div>
    <div>{count}</div>
    <div>{random}</div>
    <button onClick={() => increment(5)}> Increment by 5</button>
    <button onClick={() => increment(3)}> Increment by 3</button>
    <button onClick={() => decrement(4)}> Decrement by 4 </button>
    <button onClick={randomize}> Randommize </button>
  </div>
)

const ConnectedHome = connect(
  state => ({
    count: state.count,
    random: state.random,
  }),
  { //mapDispatchToProps
    increment: createIncrement,
    decrement: createDecrement,
    randomize: createRandomize,
  }
)(HomeComponent)

export const Home = ConnectedHome
