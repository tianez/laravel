'use strict'

const classNames = require('classNames')

class Form extends React.Component {
    constructor() {
        super()
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.info);
        if (this.props.onSubmit()) {
            this.props.onSubmit(e)
        }

    }
    render() {
        return (
            React.createElement('form', {
                className: 'form-fields form-horizontal',
                role: 'form',
                onSubmit: this.handleSubmit
            },
                React.createElement('fieldset', {
                    className: 'form-fieldset'
                },
                    React.createElement('legend', {
                        className: 'form-legend'
                    }, this.props.legend),
                    this.props.children
                )
            )
        )
    }
}
Form.defaultProps = {
    value: '保存'
}
module.exports = Form
