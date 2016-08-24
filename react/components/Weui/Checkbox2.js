'use strict'

class Checkbox2 extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            React.createElement('section', {},
                React.createElement('div', {
                    className: 'weui_cells_title'
                }, ' Checkbox'),
                React.createElement('div', {
                        className: 'weui_cells weui_cells_checkbox'
                    },
                    React.createElement('label', {
                            className: 'weui_cell weui_check_label',
                            htmlFor: 'x15'
                        },
                        React.createElement('div', {
                                className: 'weui_cell_hd'
                            },
                            React.createElement('input', {
                                className: 'weui_check',
                                name: 'checkbox2',
                                id: 'x15',
                                type: 'checkbox',
                                defaultChecked:true,
                                // checked: 'checked',
                                value: 0
                            }),
                            React.createElement('i', {
                                className: 'weui_icon_checked'
                            })
                        ),
                        React.createElement('div', {
                                className: 'weui_cell_bd weui_cell_primary'
                            },
                            React.createElement('p', {}, 'cell standard')
                        )
                    ),
                    React.createElement('label', {
                            className: 'weui_cell weui_check_label',
                            htmlFor: 'x16'
                        },
                        React.createElement('div', {
                                className: 'weui_cell_hd'
                            },
                            React.createElement('input', {
                                className: 'weui_check',
                                name: 'checkbox2',
                                id: 'x16',
                                type: 'checkbox',
                                value: 0
                            }),
                            React.createElement('i', {
                                className: 'weui_icon_checked'
                            })
                        ),
                        React.createElement('div', {
                                className: 'weui_cell_bd weui_cell_primary'
                            },
                            React.createElement('p', {}, 'cell standard')
                        )
                    )
                )
            )
        )
    }
}

module.exports = Checkbox2