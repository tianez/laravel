'use strict'
const {
    Link
} = ReactRouter
class Grid extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            React.createElement('section', {
                    className: 'weui_grids'
                },
                React.createElement(Link, {
                        className: 'weui_grid',
                        to: '/',
                        activeClassName: 'active'
                    },
                    React.createElement('div', {
                            className: 'weui_grid_icon'
                        },
                        React.createElement('img', {
                            src: 'images/icon_nav_button.png',
                        })
                    ),
                    React.createElement('p', {
                            className: 'weui_grid_label'
                        },
                        '首页'
                    )
                ),
                React.createElement(Link, {
                        className: 'weui_grid',
                        to: '/post',
                        activeClassName: 'active'
                    },
                    React.createElement('div', {
                            className: 'weui_grid_icon'
                        },
                        React.createElement('img', {
                            src: 'images/icon_nav_article.png',
                        })
                    ),
                    React.createElement('p', {
                            className: 'weui_grid_label'
                        },
                        'post'
                    )
                ),
                React.createElement(Link, {
                        className: 'weui_grid',
                        to: '/post2',
                        activeClassName: 'active'
                    },
                    React.createElement('div', {
                            className: 'weui_grid_icon'
                        },
                        React.createElement('img', {
                            src: 'images/icon_nav_button.png',
                        })
                    ),
                    React.createElement('p', {
                            className: 'weui_grid_label'
                        },
                        'post2'
                    )
                ),
                React.createElement(Link, {
                        className: 'weui_grid',
                        to: '/weui',
                        activeClassName: 'active'
                    },
                    React.createElement('div', {
                            className: 'weui_grid_icon'
                        },
                        React.createElement('img', {
                            src: 'images/icon_nav_button.png',
                        })
                    ),
                    React.createElement('p', {
                            className: 'weui_grid_label'
                        },
                        'weui'
                    )
                )
            )
        )
    }
}

module.exports = Grid