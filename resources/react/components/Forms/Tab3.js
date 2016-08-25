'use strict'

var Tab = React.createClass({
    getInitialState: function() {
        return {
            dotstyle: {
                top: 0,
                left: 0,
            },
            dot: 1
        };
    },
    componentDidMount() {
        // this.autoplay()
    },
    autoplay:function() {
        clearTimeout(this.autoplayTimer);
        let dot = this.state.dot
        this.autoplayTimer = setInterval(function () {
            let active = document.getElementsByClassName('active')
            let pre = document.getElementsByClassName('pre')
            let next = document.getElementsByClassName('next')
        }, 1000);
    },
    _onClick:function(index) {
        this.setState({
            dot: index
        })
    },
    onMouseDown:function(e) {
        console.log('鼠标按下了！')
        let top = e.clientY - e.target.getBoundingClientRect().top
        console.log(e.clientY )
        console.log(e.target.getBoundingClientRect().top)
        console.log(e)
    },
    render:function() {
        let dot = this.state.dot
        let childs = []
        if (this.props.children) {
            if (this.props.children.length) {
                childs = this.props.children
            } else {
                childs.push(this.props.children)
            }
        }
        return (
            React.createElement('div', {
                className: 'tab'
            },
                React.createElement('div', {
                    className: 'tab-cards'
                },
                    childs.map(function (child, index) {
                        let active = ''
                        if (index == dot) {
                            active = ' active'
                        } else if (index == dot - 1) {
                            active = ' pre'
                        } else if (index == dot - 1) {
                            active = ' next'
                        }
                        return React.createElement('div', {
                            key: index,
                            onClick: this._onClick,
                            className: 'tab-card' + active
                        },
                            child.props.title
                        )
                    }.bind(this)),
                    React.createElement('div', {
                        className: 'tab-card',
                        style: {
                            width: '5rem',
                        }
                    })
                ),
                React.createElement('div', {
                    className: 'tab-cards2'
                },
                    childs.map(function (child, index) {
                        let cur = ''
                        if (index == dot) {
                            cur = ' active'
                        } else if (index == dot - 1) {
                            cur = ' pre'
                        } else if (index == dot - 1) {
                            cur = ' next'
                        }
                        return React.createElement('div', {
                            key: index,
                            className: 'tab-card2 ' + cur,
                            onMouseDown: this.onMouseDown
                        },
                            child.props.children
                        )
                    }.bind(this))
                )
            )
        )
    }
})

// Tab.defaultProps = {
//     value: '保存'
// }

module.exports = Tab
