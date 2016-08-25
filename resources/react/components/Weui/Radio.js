'use strict'

class Radio extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            React.createElement('section', {},
                React.createElement('div', {
                    className: 'weui_cells_title'
                }, ' radio'),
                React.createElement('div', {
                        className: 'weui_cells weui_cells_radio'
                    },
                    React.createElement('label', {
                            className: 'weui_cell weui_check_label',
                            htmlFor: 'x11'
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
                                name: 'radio1',
                                id: 'x11',
                                type: 'radio',
                                defaultChecked:true,
                                value: 0
                            }),
                            React.createElement('span', {
                                className: 'weui_icon_checked'
                            })
                        )
                    ),
                    React.createElement('label', {
                            className: 'weui_cell weui_check_label',
                            htmlFor: 'x12'
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
                                name: 'radio1',
                                id: 'x12',
                                type: 'radio',
                                value: 1,
                                // checked: 'checked'
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

module.exports = Radio