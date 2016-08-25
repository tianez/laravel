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
                    this.props.title
                )
            )
        )
    }
}
class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: null
        }
    }
    componentDidMount() {
        new Promise(function (resolve, reject) {
            request
                .get('admin/user')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) {
                        reject('error');
                    } else {
                        let data = JSON.parse(res.text)
                        console.log(data);
                        resolve(data)
                    }
                }.bind(this))
        }).then(function (r) {
            return new Promise(function (resolve, reject) {
                resolve('2000 OK');
            })
        }).then(function (r) {
            console.log('Done: ' + r);
        }).catch(function (r) {
            console.log('Failed: ' + r);
        })
    }
    render() {
        return (
            React.createElement('header', {
                id: 'header',
                className: 'pure-u-1 pure-menu pure-menu-horizontal pure-menu-fixed'
            },
                React.createElement(Link, {
                    className: 'pure-menu-heading pure-menu-link left',
                    to: '/'
                }, '我的理想乡'),
                React.createElement('ul', {
                    className: 'pure-menu-list right'
                },
                    React.createElement(A, {
                        to: 'login',
                        title: 'login'
                    }),
                    React.createElement(A, {
                        to: 'logout',
                        title: 'logout'
                    })
                )
            )
        )
    }
}
module.exports = Header
