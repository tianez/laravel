'use strict'


// import React, { Component, PropTypes } from 'react'

const {
    Component,
    PropTypes
} = React

class Counter extends Component {
    constructor(props) {
        super(props)
        this.incrementAsync = this.incrementAsync.bind(this)
        this.incrementIfOdd = this.incrementIfOdd.bind(this)
    }

    incrementIfOdd() {
        if (this.props.value % 2 !== 0) {
            this.props.onIncrement()
        }
    }

    incrementAsync() {
        setTimeout(this.props.onIncrement, 1000)
    }

    render() {
        const { value, onIncrement, onDecrement } = this.props
        return (
            React.createElement('p', {},
                'Clicked: ' + value + ' times',

                React.createElement('button', {
                    onClick: onIncrement
                },
                    '+'
                ),
                React.createElement('button', {
                    onClick: onDecrement
                },
                    '-'
                ),
                React.createElement('button', {
                    onClick: this.incrementIfOdd
                },
                    ' Increment if odd'
                ),
                React.createElement('button', {
                    onClick: this.incrementAsync
                },
                    'Increment async'
                )
            )
        )
    }
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

//////
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

////

const {
    createStore
} = require('redux')

const store = createStore(counter)

function dd() {
    store.dispatch({ type: 'INCREMENT' })
}
function dd2() {
    store.dispatch({ type: 'DECREMENT' })
}
function render() {
    ReactDOM.render(
        React.createElement(Counter, {
            value: store.getState(),
            onIncrement: dd,
            onDecrement: dd2,
        }),
        document.getElementById('app')
    )
}

render()
store.subscribe(render)