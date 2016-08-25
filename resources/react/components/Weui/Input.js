'use strict'
const classNames = require('classNames')
class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            help: props.help,
            length: props.value.length || 0,
            error: props.error,
        }
    }
    _onChange(e) {
        let value = e.target.value
        if (this.props.onChange) {
            this.props.onChange(this.props.name, value)
        }
    }
    render() {
        const {error} = this.state
        const ecls = classNames({
            weui_cell: true,
            weui_cell_warn: error
        })
        return (
            React.createElement('section', {},
                React.createElement('div', {
                    className: 'weui_cells_title'
                }, ' 表单'),
                React.createElement('div', {
                    className: 'weui_cells weui_cells_form'
                },
                    React.createElement('div', {
                        className: ecls
                    },
                        React.createElement('div', {
                            className: 'weui_cell_hd'
                        },
                            React.createElement('label', {
                                className: 'weui_label weui_cell_hd'
                            }, this.props.title)
                        ),
                        React.createElement('div', {
                            className: 'weui_cell_bd weui_cell_primary'
                        },
                            React.createElement('input', {
                                className: 'weui_input',
                                type: this.props.type,
                                defaultValue:this.props.value,
                                maxLength: this.props.max?this.props.max:null,
                                onChange: this._onChange.bind(this),
                                placeholder: this.props.placeholder
                            })
                        ),
                        error?React.createElement('div', {
                            className: 'weui_cell_ft'
                        },
                            React.createElement('i', {
                                className: 'weui_icon_warn'
                            }
                            )
                        ):null
                    )
                )
            )
        )
    }
}
Input.defaultProps = {
    title: '项目名',
    value: '',
    name: 'test',
    type: 'text',
    placeholder: '请输入qq号',
    error: false
}
module.exports = Input