'use strict'
const request = require('superagent')
const {
    Link
} = ReactRouter;
const {
    Form,
    Input,
    Button 
} = require('../components/forms/index')
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {
                username: '',
                password: ''
            }
        }
    }
    _onChange(name, value) {
        let info = this.state.info
        info[name] = value
        this.setState({
            info: info
        })
    }
    _onSubmit(e) {
        e.preventDefault();
        request
            .post('admin/login')
            .send(this.state.info)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) throw err
                let data = JSON.parse(res.text)
                if (data.state == 'ok') {
                    storedb('user').insert(data.data)
                    this.props.history.pushState(null, '/')
                } else {
                    this.setState({ 'msg': data.msg })
                    console.log(data)
                }
            }.bind(this))
    }
    render() {
        return (
            React.createElement('section', {
                className: 'pure-g'
            },
                React.createElement('section', {
                    className: 'pure-u-1 login'
                },
                    React.createElement('section', {
                        className: 'login_t pure-u-1'
                    },
                        React.createElement(Link, {
                            to: '/',
                            title: '首页'
                        }, '首页'),
                        React.createElement(Link, {
                            to: 'login',
                            title: '登录'
                        }, '登录')
                    ),
                    this.state.msg ? React.createElement('div', {
                        className:'alert alert-warning'
                    }, this.state.msg) : null,
                    React.createElement(Form, {
                        action: 'user/login',
                        info: this.state.info,
                        apiSubmit: false,
                        legend: '用户登录',
                        onSubmit: this._onSubmit.bind(this)
                    },
                        React.createElement(Input, {
                            type: 'text',
                            title: '用户名',
                            name: 'username',
                            placeholder: '请输入您的用户名！',
                            value: this.state.info.username,
                            onChange: this._onChange.bind(this)
                        }),
                        React.createElement(Input, {
                            type: 'password',
                            title: '密码',
                            name: 'password',
                            placeholder: '请输入您的密码！',
                            value: this.state.info.password,
                            onChange: this._onChange.bind(this)
                        }),
                        React.createElement(Button, {
                            value: '登录'
                        })
                    )
                )
            )
        )
    }
}
module.exports = Login
