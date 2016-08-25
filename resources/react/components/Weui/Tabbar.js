'use strict'
const classNames = require('classNames')
class Tabbar extends React.Component {
    constructor() {
        super()
    }
    render() {
        const {className, onClick} = this.props;
        const cls = classNames({
            weui_btn: true,
            [className]: className
        })
        return (
            React.createElement('div', {
                className: 'weui_tab'
            },
                React.createElement('div', {
                    className: 'weui_tab_bd'
                }),
                React.createElement('div', {
                    className: 'weui_tabbar'
                },
                    React.createElement('a', {
                        className: 'weui_tabbar_item weui_bar_item_on',
                        href: 'javascript:;'
                    },
                        React.createElement('div', {
                            className: 'weui_tabbar_icon',
                            href: 'javascript:;',
                        },
                            React.createElement('img', {
                                src: 'images/icon_nav_button.png',
                            })
                        ),
                        React.createElement('p', {
                            className: 'weui_tabbar_label'
                        }, '微信')
                    ),
                    React.createElement('a', {
                        className: 'weui_tabbar_item',
                        href: 'javascript:;'
                    },
                        React.createElement('div', {
                            className: 'weui_tabbar_icon',
                            href: 'javascript:;',
                        },
                            React.createElement('img', {
                                src: 'images/icon_nav_msg.png',
                            })
                        ),
                        React.createElement('p', {
                            className: 'weui_tabbar_label'
                        }, '通讯录')
                    ),
                    React.createElement('a', {
                        className: 'weui_tabbar_item',
                        href: 'javascript:;'
                    },
                        React.createElement('div', {
                            className: 'weui_tabbar_icon',
                            href: 'javascript:;',
                        },
                            React.createElement('img', {
                                src: 'images/icon_nav_article.png',
                            })
                        ),
                        React.createElement('p', {
                            className: 'weui_tabbar_label'
                        }, '发现')
                    ),
                    React.createElement('a', {
                        className: 'weui_tabbar_item',
                        href: 'javascript:;'
                    },
                        React.createElement('div', {
                            className: 'weui_tabbar_icon',
                            href: 'javascript:;',
                        },
                            React.createElement('img', {
                                src: 'images/icon_nav_cell.png',
                            })
                        ),
                        React.createElement('p', {
                            className: 'weui_tabbar_label'
                        }, '我')
                    )
                )
            )
        )
    }
}
Tabbar.defaultProps = {
    title: '保存'
}
module.exports = Tabbar