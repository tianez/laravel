/**
 * Created by jf on 15/10/27.
 */

class Toast extends React.Component {
    constructor() {
        super()
        this.state = ConfigStore.get('toast')
    }
    componentWillReceiveProps(nextProps, nextState) {
        let toast = ConfigStore.get('toast')
        if (toast.show == this.state.show) {
            return
        }
        this.setState(toast)
        if (toast.show) {
            setTimeout(() => {
                ConfigActions.update('toast', { show: false })
            }, 3000)
        }
    }
    render() {
        const { icon } = this.props
        return (
            React.createElement('div', {
                className: (icon === 'loading') ? 'weui_loading_toast' : '',
                style: {
                    display: this.state.show ? 'block' : 'none'
                }
            },
                React.createElement('div', {
                    className: 'weui_mask_transparent'
                }),
                React.createElement('div', {
                    className: 'weui_toast'
                },
                    React.createElement('i', {
                        className: 'weui_icon_toast'
                    }),
                    React.createElement('p', {
                        className: 'weui_toast_content'
                    }, this.state.msg ? this.state.msg : this.props.msg))
            )
        )
    }
}

Toast.defaultProps = {
    icon: 'toast',
    show: false,
    msg: 'OK！',
}
module.exports = Toast