'use strict'

const classNames = require('classNames')

class Header extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            React.createElement('header', {
                id: 'header',
                className: 'header',
            },
                React.createElement('i', {
                    className: 'fa fa-home fa-left',
                }),
                React.createElement('div', {
                    className: 'title',
                }, this.props.title)
            )
        )
    }
}
Header.defaultProps = {
    title: '头部'
}
module.exports = Header