'use strict'
const classNames = require('classNames')
class Navbar extends React.Component {
    constructor() {
        super()
    }
    render() {
        const {className} = this.props;
        const cls = classNames({
            weui_tab: true,
            [className]: className
        })
        return (
            React.createElement('div', {
                className: cls
            },
                React.createElement('div', {
                    className: 'weui_navbar',
                },
                    React.createElement('div', {
                        className: 'weui_navbar_item weui_bar_item_on',
                    }, this.props.title),
                    React.createElement('div', {
                        className: 'weui_navbar_item',
                    }, this.props.title),
                    React.createElement('div', {
                        className: 'weui_navbar_item',
                    }, this.props.title)
                ),
                React.createElement('div', {
                    className: 'weui_tab_bd',
                }, this.props.title)
            )
        )
    }
}
Navbar.defaultProps = {
    title: '保存'
}
module.exports = Navbar