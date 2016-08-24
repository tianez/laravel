'use strict'

class Switch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
    }
    _onChange(e) {
        let v
        if (this.state.value == 'on') {
            v = 'off'
        } else {
            v = 'on'
        }
        this.setState({
            value: v
        })
        if (this.props.onChange) {
            this.props.onChange(this.props.name, v)
        }
    }
    render() {
        return (
            React.createElement('section', {},
                React.createElement('div', {
                    className: 'weui_cells_title'
                }, ' 开关'),
                React.createElement('div', {
                    className: 'weui_cells weui_cells_form'
                },
                    React.createElement('div', {
                        className: 'weui_cell weui_cell_switch'
                    },
                        React.createElement('div', {
                            className: 'weui_cell_hd weui_cell_primary'
                        },
                            '声音'
                        ),
                        React.createElement('div', {
                            className: 'weui_cell_ft'
                        },
                            React.createElement('input', {
                                className: 'weui_switch',
                                type: 'radio',
                                name: this.props.name,
                                onChange: this._onChange.bind(this),
                                checked: this.state.value == 'on' ? true : false
                            })
                        )
                    )
                )
            )
        )
    }
}

Switch.defaultProps = {
    value: '',
    name: 'switch',
    checked: false
}

module.exports = Switch