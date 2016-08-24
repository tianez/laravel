'use strict'

class Progress extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            React.createElement('div', {
                className: 'weui_progress'
            },
                React.createElement('div', {
                    className: 'weui_progress_bar'
                },
                    React.createElement('div', {
                        className: 'weui_progress_inner_bar js_progress',
                        style: {
                            width: '80%'
                        }
                    })
                ),
                React.createElement('a', {
                    className: 'weui_progress_opr',
                    href: 'javascript:;'
                },
                    React.createElement('i', {
                        className: 'weui_icon_cancel'
                    })
                )
            )
        )
    }
}
Progress.defaultProps = {
    title: '保存'
}
module.exports = Progress