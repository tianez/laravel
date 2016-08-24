'use strict'

class Textarea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textCounter: props.value ? props.value.length : 0
        }
    }
    _onChange(e) {
        let value = e.target.value
        this.setState({
            textCounter: value.length
        })
        if (this.props.onChange) {
            this.props.onChange(this.props.name, value)
        }
    }
    render() {
        const { title, showCounter, max} = this.props;
        return (
            React.createElement('section', {},
                React.createElement('div', {
                    className: 'weui_cells_title'
                }, this.props.title),
                React.createElement('div', {
                    className: 'weui_cells weui_cells_form'
                },
                    React.createElement('div', {
                        className: 'weui_cell'
                    },
                        React.createElement('div', {
                            className: 'weui_cell_bd weui_cell_primary'
                        },
                            React.createElement('textarea', {
                                className: 'weui_textarea',
                                rows: 3,
                                defaultValue: this.props.value,
                                maxLength: max,
                                onChange: this._onChange.bind(this),
                                placeholder: this.props.placeholder
                            }),
                            showCounter ? React.createElement('div', {
                                className: 'weui_textarea_counter'
                            },
                                React.createElement('span', {}, this.state.textCounter),
                                max ? '/' + max : null
                            ) : null
                        )
                    )
                )
            )
        )
    }
}

Textarea.defaultProps = {
    title: '项目名',
    value: '',
    name: 'textarea',
    showCounter: true,
    placeholder: '项目名'
}

module.exports = Textarea