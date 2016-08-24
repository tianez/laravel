'use strict'
const classNames = require('classNames')
class Button extends React.Component {
    constructor() {
        super()
    }
    render() {
        const {className, onClick} = this.props;
        const cls = classNames({
            weui_btn: true,
            [className]: className
        })
        const Component = this.props.href ? 'a' : 'button';
        return (
            React.createElement('div', {
                className: 'weui_btn_area'
            },
                React.createElement(Component, {
                    className: cls,
                    onClick: onClick
                }, this.props.title)
            )
        )
    }
}
Button.defaultProps = {
    title: '保存'
}
module.exports = Button