'use strict'
const ajaxUpload = require('../utils/AjaxUpload')
const {
    getUpToken
} = require('../utils/Qiniu')
class Uploader extends React.Component {
    constructor() {
        super()
        this.state = ({
            files: [],
            thumbs: []
        })
    }
    _onChange(e) {
        e.preventDefault()
        let files = e.target.files
        // 文件过滤
        // 只允许上传图片
        files = Array.prototype.slice.call(files, 0)
        files = files.filter(function (file) {
            return /image/i.test(file.type)
        })
        let value
        if (this.props.multiple) {
            value = this.state.files
        } else {
            value = []
        }
        let count = this.props.multiple ? files.length : 1
        let i
        for (i = 0; i < count; i++) {
            files[i].thumb = URL.createObjectURL(files[i])
            files[i].state = 0
            value = value.concat(files[i])
        }
        this.setState({
            files: value
        })
        let count2 = this.props.multiple ? value.length : 1
        for (i = 0; i < count2; i++) {
            if (value[i].state != 1 && value[i].state != 4) {
                this.uploadFile(value, i)
            }
        }
    }
    uploadFile(files, id) {
        let qnurl = 'http://7xj11y.com1.z0.glb.clouddn.com'
        let token = getUpToken()
        let file = files[id]
        return ajaxUpload({
            url: 'http://up.qiniu.com',
            name: 'file',
            key: file.name,
            token: token,
            cors: this.props.cors,
            withCredentials: this.props.withCredentials,
            file: file,
            onProgress: (e) => {
                console.log((e.loaded / e.total) * 100 + '%')
            },
            onLoad: (e) => {
                let thumbs
                let res = JSON.parse(e.currentTarget.responseText)
                files[id].state = 1
                // file.url = qnurl + '/' + res.name
                if (this.props.multiple) {
                    thumbs = this.state.thumbs
                } else {
                    thumbs = []
                }
                thumbs.push(qnurl + '/' + res.name)
                this.setState({
                    files: files,
                    thumbs: thumbs
                })
                thumbs = JSON.stringify(thumbs)
                if (this.props.onChange) {
                    this.props.onChange(this.props.name, thumbs)
                }
            },
            onError: () => {
                files[id].state = 2
                this.setState({
                    files: files
                })
            }
        })
    }
    render() {
        let files = this.state.files
        let thumbs = files.map(function (file, index) {
            return React.createElement('li', {
                key:index,
                className: 'weui_uploader_file',
                style: {
                    backgroundImage: 'url(' + file.thumb + ')'
                }
            })
        })
        return (
            React.createElement('section', {},
                React.createElement('div', {
                    className: 'weui_cells_title'
                }, ' 表单'),
                React.createElement('div', {
                    className: 'weui_cells weui_cells_form'
                },
                    React.createElement('div', {
                        className: 'weui_cell'
                    },
                        React.createElement('div', {
                            className: 'weui_cell_bd weui_cell_primary'
                        },
                            React.createElement('div', {
                                className: 'weui_uploader'
                            },
                                React.createElement('div', {
                                    className: 'weui_uploader_hd weui_cell',
                                },
                                    React.createElement('div', {
                                        className: 'weui_cell_bd weui_cell_primary',
                                    }, '图片上传'),
                                    React.createElement('div', {
                                        className: 'weui_cell_ft',
                                    }, '0/'+files.length)
                                ),
                                React.createElement('div', {
                                    className: 'weui_uploader_bd',
                                },
                                    React.createElement('ul', {
                                        className: 'weui_uploader_files',
                                    },
                                        thumbs,
                                        React.createElement('li', {
                                            className: 'weui_uploader_file',
                                            style: {
                                                backgroundImage: 'url(images/app-icon.png)'
                                            }
                                        }),
                                        React.createElement('li', {
                                            className: 'weui_uploader_file weui_uploader_status',
                                            style: {
                                                backgroundImage: 'url(images/app-icon.png)'
                                            }
                                        },
                                            React.createElement('div', {
                                                className: 'weui_uploader_status_content'
                                            },
                                                React.createElement('i', {
                                                    className: 'weui_icon_warn'
                                                })
                                            )
                                        ),
                                        React.createElement('li', {
                                            className: 'weui_uploader_file weui_uploader_status',
                                            style: {
                                                backgroundImage: 'url(images/app-icon.png)'
                                            }
                                        },
                                            React.createElement('div', {
                                                className: 'weui_uploader_status_content'
                                            }, '50%')
                                        )
                                    ),
                                    React.createElement('div', {
                                        className: 'weui_uploader_input_wrp',
                                    },
                                        React.createElement('input', {
                                            className: 'weui_uploader_input',
                                            type: 'file',
                                            accept: 'image/*',
                                            multiple: this.props.multiple,
                                            onChange: this._onChange.bind(this)
                                        })
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    }
}

Uploader.defaultProps = {
    multiple: false,
}

module.exports = Uploader