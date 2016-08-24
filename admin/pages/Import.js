'use strict'

const {
    Form,
    FormGroup,
    Input,
    Button,
    Hidden
} = require('../components/forms/index')

const ajaxUpload = require('../components/utils/AjaxUpload')
const {
    getUpToken
} = require('../components/utils/Qiniu')

class Import extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        ConfigActions.update('title', '数据导入')
    }
    _onSubmit() {
        let files = this.refs.file2.files
        console.log(files);
        console.log('12');
        let token = getUpToken()
        let file = files[0]
        return ajaxUpload({
            url: 'admin2/uploads',
            name: 'file',
            key: file.name,
            file: file,
            data: {
                table: 'member'
            },
            onProgress: (e) => {
                console.log((e.loaded / e.total) * 100 + '%')
            },
            onLoad: (e) => {
                let res = JSON.parse(e.currentTarget.responseText)
                console.log(res);
            },
            onError: () => {
            }
        })
    }
    _onSubmit2() {
        let files = this.refs.result.files
        let token = getUpToken()
        let file = files[0]
        return ajaxUpload({
            url: 'admin2/uploads',
            name: 'file',
            key: file.name,
            file: file,
            data: {
                table: 'result'
            },
            onProgress: (e) => {
                console.log((e.loaded / e.total) * 100 + '%')
            },
            onLoad: (e) => {
                let res = JSON.parse(e.currentTarget.responseText)
                console.log(res);
            },
            onError: () => {
            }
        })
    }
    render() {
        return (
            React.createElement('div', {
                className: 'container pure-g'
            },
                React.createElement('div', {
                    className: 'pure-u-1'
                },
                    React.createElement(Form, {
                        action: 'user/login',
                        apiSubmit: false,
                        legend: '人员数据上传',
                        onSubmit: this._onSubmit.bind(this)
                    },
                        React.createElement(FormGroup, {
                            title: '文件上传'
                        },
                            React.createElement('input', {
                                id: 'file',
                                name: 'file',
                                ref: 'file2',
                                className: 'ipt',
                                type: 'file',
                                multiple: false,
                            })
                        ),
                        React.createElement(Button, {
                            value: '文件上传'
                        })
                    ),
                    React.createElement(Form, {
                        action: 'user/login',
                        apiSubmit: false,
                        legend: '人员数据上传',
                        onSubmit: this._onSubmit2.bind(this)
                    },
                        React.createElement(FormGroup, {
                            title: '文件上传'
                        },
                            React.createElement('input', {
                                id: 'file',
                                name: 'file',
                                ref: 'result',
                                className: 'ipt',
                                type: 'file',
                                multiple: false,
                            })
                        ),
                        React.createElement(Button, {
                            value: '文件上传'
                        })
                    )
                )
            )
        )
    }
}

Import.defaultProps = {
    value: '保存'
}

module.exports = Import
