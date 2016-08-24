'use strict'

class Tab extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            dotstyle: {
                top: 0,
                left: 0,
            },
            dot: 1
        })
        if (props.children && props.children.length) {
            this.length = this.props.children.length
        }
        this.autoplayTimer = null
    }
    componentDidMount() {
        if (this.props.children && this.props.children.length) {
            // this.autoplay()
        }
    }
    autoplay() {
        clearInterval(this.autoplayTimer);
        let length = this.length - 1
        this.autoplayTimer = setInterval(function() {
            let dot = this.state.dot
            if (dot < length) {
                dot += 1
            } else {
                dot = 0
            }
            this.setState({
                dot: dot
            })
        }.bind(this), 1000);
    }
    pause() {
        clearInterval(this.autoplayTimer);
    }
    _onClick(index) {
        this.setState({
            dot: index
        })
    }
    onMouseDown(e) {
        console.log('鼠标按下了！')
        e.target.style.transition = "all 0s"
        console.log(e.clientY)
        console.log(e.target.getBoundingClientRect().top)
        console.log(e)
    }
    onMouseMove(e) {
        console.log('鼠标移动了！')
        console.log(e.clientX)
        console.log(e.target.getBoundingClientRect().left)
        console.log(e)
    }
    onDragStart(e) {
        console.log('开始拖动')
        console.log(e.clientX)
        console.log(e.target.getBoundingClientRect().left)
        this.setState({
            x: e.clientX
        })
    }
    onDrag(e) {
        console.log('拖动')
        console.log(this.state.x)
        console.log(e.clientX)
        if (e.clientX == 0) {
            return
        }
        let left = -(this.state.x - e.clientX) + 'px'
        console.log(left)
        e.target.style.left = left
    }
    onDragOver(e) {
        console.log('拖动结束')
        let width = e.target.getBoundingClientRect().width
        let w = width / 2
        let left = this.state.x - e.clientX
        console.log(left)
        if (left > w) {
            e.target.style.transition = "all .6s"
            console.log(12121)
            e.target.style.left = (-width + 'px')
        } else if (-left > w) {
            e.target.style.transition = "all .6s"
            console.log(99)
            e.target.style.left = (width + 'px')
        } else {
            e.target.style.transition = "all .6s"
            e.target.style.left = 0
        }
    }
    onTouchStart(e) {
        this.pause()
        e.target.style.transition = "all 0s"
        let point = e.touches ? e.touches[0] : e;
        this.startX = point.pageX;
        this.startY = point.pageY;
    }
    onTouchMove(e) {
        e.preventDefault();
        let point = e.touches ? e.touches[0] : e;
        this.endX = point.pageX;
        this.endY = point.pageY;
        let deltaX = point.pageX - this.startX;
        let deltaY = point.pageY - this.startY;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.stopPropagation();
        }
        e.target.style.transform = 'translateX(' + deltaX + 'px)'
        let dot = this.state.dot
        let width = e.target.getBoundingClientRect().width
        if (deltaX > 0 && dot != 0) {
            dot = dot - 1
            let refName = "tab" + dot;
            this.refs[refName].style.transition = "all 0s"
            this.refs[refName].style.transform = 'translateX(' + (deltaX - width) + 'px)'
        } else if (deltaX < 0 && dot < this.length - 1) {
            dot = dot + 1
            let refName = "tab" + dot;
            this.refs[refName].style.transition = "all 0s"
            this.refs[refName].style.transform = 'translateX(' + (deltaX + width) + 'px)'
        }
    }
    onTouchEnd(e) {
        if (this.endX == 0) {
            return
        }
        let dot = this.state.dot
        let width = e.target.getBoundingClientRect().width
        let w = width / 4
        let mv = this.endX - this.startX
        let mx = Math.abs(mv)
        e.target.style.transition = "all .3s"
        if (mx > w) {
            if (mv > 0 && dot > 0) {
                e.target.style.transform = 'translateX(' + width + 'px)'
                dot = dot - 1
            } else if (mv < 0 && dot < this.length - 1) {
                e.target.style.transform = 'translateX(' + (-width) + 'px)'
                dot = dot + 1
            }
            if (dot != this.state.dot) {
                let refName = "tab" + dot;
                let ev = this.refs[refName].style
                ev.transition = "all .3s"
                ev.transform = 'translateX(0)'
                this.refs.dot.innerHTML = (dot + 1) + '/' + this.length
                setTimeout(function() {
                    this.setState({
                        dot: dot
                    })
                }.bind(this), 600)
            } else {
                e.target.style.transform = 'translateX(0)'
            }
        } else {
            if (mv > 0 && dot > 0) {
                dot = dot - 1
                let refName = "tab" + dot;
                let ev = this.refs[refName].style
                ev.transition = "all .3s"
                ev.transform = 'translateX(-100%)'
            } else if (mv < 0 && dot < this.length - 1) {
                dot = dot + 1
                let refName = "tab" + dot;
                let ev = this.refs[refName].style
                ev.transition = "all .3s"
                ev.transform = 'translateX(100%)'
            }
            e.target.style.transform = 'translateX(0)'
        }
        this.startX = 0
        this.endX = 0
    }
    onTouchCancel(e) {
        this.onTouchEnd.bind(this)
        console.log(e);
    }
    render() {
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
                    childs.map(function(child, index) {
                        let active = ''
                        if (index == dot) {
                            active = ' active'
                        }
                        return React.createElement('div', {
                                key: index,
                                onClick: this._onClick.bind(this, index),
                                className: 'tab-card' + active
                            },
                            child.props.title
                        )
                    }.bind(this))
                ),
                React.createElement('div', {
                        className: 'tab-cards2',
                        ref:'cards'
                    },
                    childs.map(function(child, index) {
                        let style
                        if (index == dot) {
                            style = {
                                transform: 'translateX(0)'
                            }
                        } else if (index < dot) {
                            style = {
                                transform: 'translateX(-100%)'
                            }
                        } else if (index > dot) {
                            style = {
                                transform: 'translateX(100%)'
                            }
                        }
                        return React.createElement('div', {
                                key: index,
                                ref: 'tab' + index,
                                // draggable: true,
                                className: 'tab-card2',
                                style: style,
                                // onMouseDown: this.onMouseDown.bind(this),
                                // onMouseMove: this.onMouseMove.bind(this),
                                // onDragStart: this.onDragStart.bind(this),
                                // onDrag: this.onDrag.bind(this),
                                // onDragOver: this.onDragOver.bind(this),
                                onTouchStart: this.onTouchStart.bind(this),
                                onTouchMove: this.onTouchMove.bind(this),
                                onTouchEnd: this.onTouchEnd.bind(this),
                                onTouchCancel: this.onTouchCancel.bind(this),
                            },
                            child.props.children,
                            React.createElement('div', {
                                className: 'p'
                            }, child.props.title)
                        )
                    }.bind(this)),
                    React.createElement('div', {
                        ref: 'dot',
                        className: 'dot'
                    }, (this.state.dot + 1) + '/' + this.length)
                ),
                React.createElement('div', {
                    className: 'dd',
                    onClick: this.pause.bind(this)
                }, '暂停'),
                React.createElement('div', {
                    className: 'dd',
                    onClick: this.autoplay.bind(this)
                }, 'bofang')
            )
        )
    }
}

Tab.defaultProps = {
    value: '保存'
}

module.exports = Tab