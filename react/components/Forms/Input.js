'use strict'

const classNames = require('classNames')
const FormGroup = require('./FormGroup')

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            help: props.help,
            length: props.value.length || 0
        }
    }
    componentWillMount() {
        let length = this.props.value.length || 0
        let help = this.props.help || '请输入' + this.props.title
        this.setState({
            help: help
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.value !== this.props.value) || (this.state.value !== nextState.value)
    }
    componentWillReceiveProps(nextProps) {
        this.setState( {
            value: nextProps.value
        })
    }
    oo(_this, value) {
        let error
        let warning
        let success
        value = value.replace(/(^\s*)|(\s*$)/, "")
        let length = value.length
        let help = _this.props.help || '请输入' + _this.props.title
        if (length > 0) {
            if (_this.props.min && length < _this.props.min) {
                help = '请输入至少' + _this.props.min + '个字符！'
                error = true
            } else if (_this.props.max && length > _this.props.max) {
                help = '请输入至多' + _this.props.max + '个字符！'
                error = true
            }
            if (!error) {
                success = true
            }
        } else if (_this.props.required) {
            help = _this.props.title + '必须填写！'
            warning = true
        }
        _this.setState({
            value: value,
            help: help,
            length: length,
            error: error,
            warning: warning,
            success: success,
        })
        if (_this.props.onChange) {
            _this.props.onChange(_this.props.name, value)
        }
    }
    _onChange(e) {
        let that = this
        let value = e.target.value
        this.oo(that, value)
    }
    _delete(e) {
        let that = this
        let value = ''
        this.oo(that, value)
    }
    render() {
        let Class = classNames({
            'has-error': this.state.error,
            'has-warning': this.state.warning,
            'has-success': this.state.success
        })
        let limit = ' ' + this.state.length
        if (this.props.max) {
            limit += ' / ' + this.props.max
        }
        return (
            React.createElement(FormGroup, {
                class: Class,
                title: this.props.title,
                limit: limit,
                help: this.state.help
            },
                React.createElement('input', {
                    className: 'form-input',
                    type: this.props.type,
                    max: this.props.max,
                    min: this.props.min,
                    placeholder: this.props.placeholder,
                    disabled: this.props.disabled,
                    autoComplete: this.props.autoComplete,
                    value: this.state.value,
                    onChange: this._onChange.bind(this)
                }),
                React.createElement('span', {
                    className: 'form-delete',
                    onClick: this._delete.bind(this)
                }, '×')
            )
        )
    }
}
Input.defaultProps = {
    title: '字段名称',
    type: 'text',
    value: 'haode',
    min: 6,
    autocomplete: 'off',
    required: 'required',
    help: '帮助提示'
}
module.exports = Input
