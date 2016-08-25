'use strict'

class Checkbox extends React.Component {
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
                        className: 'weui_cells weui_cells_radio'
                    },
                    React.createElement('label', {
                            className: 'weui_cell weui_check_label',
                            htmlFor: 'x13'
                        },
                        React.createElement('div', {
                                className: 'weui_cell_bd weui_cell_primary'
                            },
                            React.createElement('div', {}, 'cell standard')
                        ),
                        React.createElement('div', {
                                className: 'weui_cell_ft'
                            },
                            React.createElement('input', {
                                className: 'weui_check',
                                name: 'checkbox',
                                id: 'x13',
                                type: 'checkbox',
                                value: 0
                            }),
                            React.createElement('span', {
                                className: 'weui_icon_checked'
                            })
                        )
                    ),
                    React.createElement('label', {
                            className: 'weui_cell weui_check_label',
                            htmlFor: 'x14'
                        },
                        React.createElement('div', {
                                className: 'weui_cell_bd weui_cell_primary'
                            },
                            React.createElement('div', {}, 'cell standard')
                        ),
                        React.createElement('div', {
                                className: 'weui_cell_ft'
                            },
                            React.createElement('input', {
                                className: 'weui_check',
                                name: 'checkbox',
                                id: 'x14',
                                type: 'checkbox',
                                value: 1
                            }),
                            React.createElement('span', {
                                className: 'weui_icon_checked'
                            })
                        )
                    )
                )
            )
        )
    }
}

module.exports = Checkbox