'use strict'

const classNames = require('classNames')
const Reload = require('./Reload')
const {
    Grid
} = require('../Weui')

const Content = React.createClass({
    getDefaultProps: function () {
        return {
            time: ' .3s',
        };
    },
    getInitialState: function () {
        this.dX = 0
        this.dY = 0
        return {
            loaded: true
        }
    },
    _onChange: function () {
        let loaded = ConfigStore.get('loaded')
        this.setState({
            loaded: loaded
        })
    },
    componentDidMount: function () {
        this.refs.content.style.minHeight = (window.screen.height - 48 * 2) + 'px'
        ConfigStore.addChangeListener(this._onChange)
    },
    componentWillUnmount: function () {
        ConfigStore.removeChangeListener(this._onChange)
    },
    onTouchStart: function (e) {
        this.refs.content.style.transitionDuration = "0s"
        this.refs.reload.style.transitionDuration = "0s"
        let point = e.touches ? e.touches[0] : e;
        this.startX = point.pageX;
        this.startY = point.pageY;
    },
    onTouchMove: function (e) {
        let scrollTop = document.body.scrollTop
        if (scrollTop != 0) {
            return
        }
        let point = e.touches ? e.touches[0] : e;
        this.endX = point.pageX;
        this.endY = point.pageY;
        this.deltaX = point.pageX - this.startX;
        this.deltaY = point.pageY - this.startY;
        if (this.deltaY < 48) {
            return
        }
        let dY = 48
        let mcontent = this.deltaY - scrollTop
        let mreload = this.deltaY + dY - scrollTop
        document.body.scrollTop = 0
        let loaded = ConfigStore.get('loaded')
        if (!loaded) {
            mcontent = mcontent + dY
            mreload = mreload + dY
        }
        this.refs.content.style.transform = 'translateY(' + mcontent + 'px)'
        this.refs.reload.style.transform = 'translateY(' + (mreload / 2) + 'px)'
    },
    onTouchEnd: function (e) {
        // document.body.scrollTop = 0
        if (!this.endY) {
            return
        }
        this.endY = null
        let loaded = ConfigStore.get('loaded')
        this.refs.content.style.transitionDuration = this.props.time
        this.refs.reload.style.transitionDuration = this.props.time
        if ((this.deltaY < 0) || (this.deltaY < 40 && loaded)) {
            this.refs.content.style.transform = 'translateY(0)'
            this.refs.reload.style.transform = 'translateY(0)'
            return
        }
        this.refs.content.style.transform = 'translateY(48px)'
        this.refs.reload.style.transform = 'translateY(48px)'
        if (!this.props.reLoad) {
            ConfigActions.update('loaded', true)
            return
        }
        if (loaded) {
            ConfigActions.update('loaded', false)
            this.props.reLoad()
        }
    },
    onTouchCancel: function (e) {
        this.onTouchEnd
    },
    render: function () {
        let loaded = ConfigStore.get('loaded')
        let style = {}
        if (loaded) {
            style = {
                transitionDuration: this.props.time,
                transform: 'translateY(0)'
            }
        } else {
            style = {
                transitionDuration: this.props.time,
                transform: 'translateY(48px)'
            }
        }
        return (
            React.createElement('section', {
                id: 'section',
                className: 'section',
                onTouchStart: this.onTouchStart,
                onTouchMove: this.onTouchMove,
                onTouchEnd: this.onTouchEnd,
                onTouchCancel: this.onTouchCancel,
            },
                React.createElement('section', {
                    ref: 'reload',
                    id: 'reload',
                    className: 'reload',
                    style: style
                },
                    React.createElement(Reload, { loaded: loaded })
                ),
                React.createElement('section', {
                    id: 'content',
                    className: 'content',
                    ref: 'content',
                    style: style,
                    height: this.props.contentheight
                },
                    React.createElement(Grid),
                    this.props.children
                )
            )
        )
    }
})
module.exports = Content