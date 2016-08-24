'use strict'

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
    Panel
} = require('../components/Weui')
const {
    Content
} = require('../components/Layout')
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            kk: '33333333333'
        }
    }
    componentDidMount() {
        ConfigActions.update('title', '首页')
        let audio = this.refs.audio;
        // audio.play()
        audio.addEventListener('timeupdate', function () { //剩余时间
            if (!isNaN(audio.duration)) {
                var surplus = audio.duration - audio.currentTime;
                console.log(surplus);
            }
        }, false);
    }
    componentWillReceiveProps() {
        console.log(ConfigStore.get('refresh'))
    }
    click() {
        console.log('3');
        toast()
    }
    reLoad() {
        setTimeout(function () {
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
                React.createElement(Input,{
                    onChange:this._onChange.bind(this),
                    type:'tel' 
                }),
                React.createElement(Panel),
                React.createElement(Button, {
                    className: 'weui_btn_primary',
                    onClick: this.click.bind(this)
                }),
                React.createElement('div', {
                    className: 'form-group animated bounceInRight'
                },
                    React.createElement('div', {
                        className: 'form-control'
                    },
                        React.createElement('audio', {
                            ref: 'audio',
                            src: '1.mp3',
                            controls: 'controls',
                            loop: 'loop',
                            autoPlay: false
                        }, '亲 您的浏览器不支持html5的audio标签')
                    )
                )
            )
        )
    }
}

module.exports = Home