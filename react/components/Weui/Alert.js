'use strict'
const classNames = require('classNames')
class Alert extends React.Component {
    constructor(props) {
        super(props)
        if (props.g) {
            this.state = ConfigStore.get('alert')
        } else {
            this.state = props
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (this.props.g) {
            this.setState(ConfigStore.get('alert'))
        } else {
            this.setState(nextProps)
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state == nextState) {
            return false
        }
        return true
    }
    _onClick() {
        if (this.props.g) {
            ConfigActions.update('alert', { show: false })
        } else {
            this.setState({ show: false })
        }
    }
    render() {
        const cls = classNames({
            weui_dialog_confirm: !this.props.alert,
            weui_dialog_alert: this.props.alert
        })
        return (
            React.createElement('div', {
                className: cls,
                style: {
                    display: this.state.show ? 'block' : 'none'
                }
            },
                React.createElement('div', {
                    className: 'weui_mask'
                }),
                React.createElement('div', {
                    className: 'weui_dialog'
                },
                    React.createElement('div', {
                        className: 'weui_dialog_hd'
                    },
                        React.createElement('strong', {
                            className: 'weui_dialog_title'
                        },
                            this.state.title ? this.state.title : this.props.title
                        )
                    ),
                    React.createElement('div', {
                        className: 'weui_dialog_bd'
                    },
                        this.state.content ? this.state.content : this.props.content
                    ),
                    React.createElement('div', {
                        className: 'weui_dialog_ft'
                    },
                        !this.props.alert ? React.createElement('a', {
                            className: 'weui_btn_dialog default',
                            onClick: this._onClick.bind(this)
                        },
                            '取消'
                        ) : null,
                        React.createElement('a', {
                            className: 'weui_btn_dialog primary',
                            onClick: this._onClick.bind(this)
                        },
                            this.state.action ? this.state.action : this.props.action
                        )
                    )
                )
            )
        )
    }
}
Alert.defaultProps = {
    show: false,
    title: '弹窗标题',
    content: '弹窗内容，告知当前页面信息等',
    action: '确定',
    alert:true,
}

module.exports = Alert