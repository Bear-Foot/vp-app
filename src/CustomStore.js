import React, { Component } from 'react'
import T from 'prop-types'

const HandmadeStore = (initial = {}) => ({
  data: initial,
  subscribers: [],
  set(key) {
    return (value) => {
      this.data[key] = value
      this.subscribers.forEach(sub => sub())
    }
  },
  get(key) {
    return this.data[key]
  },
  subscribe(func) {
    this.subscribers.push(func)
    return () => this.subscribers = this.subscribers.filter(sub => sub !== func)
  }
})

export const MyStore = HandmadeStore({
  countNumber: 0,
  randomNumber: Math.random(),
})

export class CustomProvider extends Component {
  getChildContext() {
    return {
      customStore: this.props.store
    }
  }
  render() {
    return this.props.children
  }
}

export const CustomConnect = options => Wrapped => {
  class HOC extends Component {
    state = {}
    defineProps = () => {
      const { customStore } = this.context
      const { getters, setters } = options
      const propsToGive = {}
      if (getters) {
        Object.keys(getters).forEach(key => {
          propsToGive[key] = customStore.get(getters[key])
        })
      }

      const settersToGive = {}
      if (setters) {
        Object.keys(setters).forEach(key => {
          const setRules = setters[key]
          settersToGive[key] = setRules.handler(
            customStore.get(setRules.key),
            customStore.set(setRules.key)
          )
        })
      }
      this.setState({
        ...propsToGive,
        ...settersToGive,
      })
    }
    componentWillMount() {
      this.defineProps()
      this.unsubscribe = this.context.customStore.subscribe(this.defineProps)
    }
    componentWillUnmount() {
      this.unsubscribe()
    }
    render() {
      return <Wrapped {...this.props} {...this.state} />
    }
  }

  HOC.contextTypes = {
    customStore: T.object.isRequired
  }
  return HOC
}

CustomProvider.childContextTypes = {
  customStore: T.object.isRequired
}


// const ConnectedHome = CustomConnect(
//   {
//     getters: {
//       count: 'countNumber',
//       random: 'randomNumber',
//     },
//     setters: {
//       increment: {
//         key: 'countNumber',
//         handler: (oldValue, set) => inc => set(oldValue + inc)
//       },
//       decrement: {
//         key: 'countNumber',
//         handler: (oldValue, set) => inc => set(oldValue - inc)
//       },
//       randomize: {
//         key: 'randomNumber',
//         handler: (oldValue, set) => () => set(Math.random())
//       },
//     }
//   }
// )(HomeComponent)

// const FakeComponent = ({ count, reset }) => (
//   <div onClick={reset} style={{background: 'tomato'}}>
//     {count}
//   </div>
// )
//
// const Fake = CustomConnect({
//   getters: {
//     count: 'countNumber',
//   },
//   setters: {
//     reset: {
//       key: 'countNumber',
//       handler: (_, set) => () => set(0)
//     }
//   }
// })(FakeComponent)
