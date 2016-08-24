'use strict'

const {
    Swiper
} = require('../components/Forms')

const {
    Content
} = require('../components/Layout')

const {
    Button,
    Toast
} = require('../components/Weui')

class Post extends React.Component {
    constructor() {
        super()
        this.state = {
            kk: '33333333333',
            show: false,
            timer: null
        }
    }
    componentWillMount() {
        // console.log('0');
    }
    componentDidMount() {
        ConfigActions.update('title', 'post')
            // storedb('article').insert({ 'id': 1, 'value': '23232323' })
            // let res = storedb('article').find({ 'id': 1 })
            // console.log(res)
            // let timestamp = res[0]['_id'];
            // // var timestamp = '1425553097';
            // let d = new Date(timestamp); //根据时间戳生成的时间对象
            // let date = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + " " + (d.getHours()) + ":" + (d.getMinutes()) + ":" + (d.getSeconds())
            // console.log(date)
            // console.log(ConfigStore.get('refresh'))
    }
    componentWillReceiveProps(nextProps) {
        // if ((nextProps.location.pathname !== this.state.hash) || (nextProps.location.search !== this.state.search)) {
        //     this._req(nextProps)
        // }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if ((nextProps.location.search !== this.props.location.search) || (nextState !== this.state)) {
            return true
        }
        return false
    }
    componentWillUpdate(nextProps, nextState) {
        // console.log('1');
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log('2');
    }
    componentWillUnmount() {
        // console.log('3');
    }
    reLoad() {
        setTimeout(function() {
            Reloaded()
        }.bind(this), 3000)
    }
    componentWillUnmount() {
        this.state.timer && clearTimeout(this.state.timer);
    }
    show() {
        this.setState({ show: true });
        alert()
        // this.state.timer = setTimeout(() => {
        //     this.setState({ show: false });
        // }, 3000);
    }
    render() {
        return (
            React.createElement(Content, {
                    reLoad: this.reLoad.bind(this)
                },
                React.createElement(Button, {
                    className:'weui_btn_primary',
                    onClick: this.show.bind(this)
                }, '确认'),
                React.createElement(Toast, {
                }, 'loading...'),
                React.createElement('div', {
                        className: 'form-group'
                    },
                    React.createElement(Swiper, {
                            className: 'form-control'
                        },
                        React.createElement('div', {
                                className: 'form-control',
                                title: 'title'
                            },
                            '1111111111111111111111111'
                        ),
                        React.createElement('div', {
                                className: 'form-control',
                                title: 'title22'
                            },
                            '2222222222222222222'
                        ),
                        React.createElement('div', {
                                className: 'form-control',
                                title: 'title22'
                            },
                            '333333333333333333333333'
                        ),
                        React.createElement('div', {
                                className: 'form-control',
                                title: 'title22'
                            },
                            '44444444444444444444'
                        )
                    ),
                    this.state.kk
                )
            )
        )
    }
}

module.exports = Post