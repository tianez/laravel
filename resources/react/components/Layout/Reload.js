'use strict'

const classNames = require('classNames')

class Reload extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     refresh: props.refresh
        // }
    }
    render() {
        let text = '加载中'
        if (this.props.loaded) {
            text = '下拉刷新'
        }
        return (
            React.createElement('section', {
                ref: 'loading',
                id: 'loading',
                className: 'loading',
            },
                text
            )
        )
    }
}
Reload.defaultProps = {
    title: '刷新'
}
module.exports = Reload