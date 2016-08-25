'use strict'
const classNames = require('classNames')
class List extends React.Component {
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
            React.createElement('section', {},
                React.createElement('div', {
                    className: 'weui_cells_title'
                }, '带图标、说明的列表项'),
                React.createElement('div', {
                    className: 'weui_cells'
                },
                React.createElement('div', {
                        className: 'weui_cell'
                    },
                        React.createElement('div', {
                            className: 'weui_cell_bd weui_cell_primary'
                        },
                            React.createElement('p', {
                            }, '标题文字')
                        ),
                        React.createElement('div', {
                            className: 'weui_cell_ft'
                        },'说明文字')
                    ),
                    React.createElement('div', {
                        className: 'weui_cell'
                    },
                        React.createElement('div', {
                            className: 'weui_cell_hd'
                        },
                            React.createElement('img', {
                                src: 'images/List.png',
                                style: {
                                    width: '20px',
                                    marginRight: '5px',
                                    display: 'block'
                                }
                            })
                        ),
                        React.createElement('div', {
                            className: 'weui_cell_bd weui_cell_primary'
                        },
                            React.createElement('p', {
                            }, '标题文字')
                        ),
                        React.createElement('div', {
                            className: 'weui_cell_ft'
                        },'说明文字')
                    ),
                    React.createElement('div', {
                        className: 'weui_cell weui_cells_access'
                    },
                        React.createElement('div', {
                            className: 'weui_cell_hd'
                        },
                            React.createElement('img', {
                                src: 'images/List.png',
                                style: {
                                    width: '20px',
                                    marginRight: '5px',
                                    display: 'block'
                                }
                            })
                        ),
                        React.createElement('div', {
                            className: 'weui_cell_bd weui_cell_primary'
                        },
                            React.createElement('p', {
                            }, '标题文字')
                        ),
                        React.createElement('div', {
                            className: 'weui_cell_ft'
                        },'说明文字')
                    )
                )
            )
        )
    }
}
List.defaultProps = {
    title: '保存'
}
module.exports = List