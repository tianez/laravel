'use strict'
// const {
//     Form,
//     Input
// } = require('../components/Forms')

const {
    Input,
    Textarea,
    Checkbox,
    Checkbox2,
    Radio,
    Select,
    Select2,
    Select3,
    Switch,
    Uploader,
    Button,
    Grid,
    Navbar,
    Tabbar,
    Panel,
    Progress,
    List
} = require('../components/Weui')
const {
    Content
} = require('../components/Layout')
class Weui extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        ConfigActions.update('title', 'Weui')
    }
    toast() {
        toast()
    }
    alert() {
        alert()
    }
    reLoad() {
        setTimeout(function() {
            Reloaded()
        }.bind(this), 3000)
    }
    _onChange(name, value) {
        console.log(name);
        console.log(value);
        this.setState({
            kk: value
        })
    }
    render() {
        return (
            React.createElement(Content, {
                    reLoad: this.reLoad.bind(this)
                },
                React.createElement(Input, {
                    onChange: this._onChange.bind(this),
                    type: 'tel'
                }),
                React.createElement(Input, {
                    title:'时间',
                    type: 'date',
                    onChange: this._onChange.bind(this),
                }),
                React.createElement(Input, {
                    onChange: this._onChange.bind(this),
                    type: 'datetime-local'
                }),
                React.createElement(Textarea,{value:'haod'}),
                React.createElement(List),
                React.createElement(Checkbox),
                React.createElement(Checkbox2),
                React.createElement(Radio),
                React.createElement(Select),
                React.createElement(Select2),
                React.createElement(Select3),
                React.createElement(Switch),
                React.createElement(Uploader),
                React.createElement(Navbar),
                React.createElement(Progress),
                React.createElement(Panel),

                React.createElement(Button, {
                    className: 'weui_btn_primary',
                    title: 'alert',
                    onClick: this.alert.bind(this)
                }),
                React.createElement(Button, {
                    className: 'weui_btn_primary',
                    title: 'toast',
                    onClick: this.toast.bind(this)
                })
            )
        )
    }
}

module.exports = Weui