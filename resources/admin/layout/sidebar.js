'use strict'
const {
    Link
} = ReactRouter;

const Apicloud = require('../components/utils/Apicloud')
class A extends React.Component {
    render() {
        return (
            React.createElement('li', {
                className: 'pure-menu-item'
            },
                React.createElement(Link, {
                    className: 'pure-menu-link',
                    to: '/' + this.props.to,
                    activeClassName: 'active'
                },
                    React.createElement("i", {
                        className: this.props.icon || 'fa fa-home'
                    }),
                    React.createElement("span", {}, this.props.title)
                ),
                this.props.children
            )
        )
    }
}

class Sidebar extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        let filter = {
            where: {
                state: 1
            },
            order: ['order DESC', 'createdAt DESC'],
            limit: 20
        }
        Apicloud.get('menu', filter, function (err, res) {
            let menu = JSON.parse(res.text)
            this.setState({
                menu: menu
            })
        }.bind(this))
    }
    render() {
        let menus
        if (this.state.menu) {
            menus = this.state.menu.map(function (d, index) {
                return React.createElement(A, {
                    key: index,
                    to: d.link,
                    title: d.title
                })
            })
        }
        return (
            React.createElement('aside', {
                id: 'sidebar',
                className: 'pure-u-1 pure-menu sidebar'
            },
                React.createElement(Link, {
                    className: 'pure-menu-heading pure-menu-link',
                    to: '/'
                }, '我的理想乡'),
                React.createElement('ul', {
                    className: 'pure-menu-list'
                },
                    React.createElement(A, {
                        to: 'drag',
                        title: 'drag'
                    }),
                    React.createElement(A, {
                        to: 'import',
                        title: 'import'
                    }),
                    menus
                )
            )
        )
    }
}
module.exports = Sidebar
