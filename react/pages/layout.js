'use strict'
const {
    Link
} = ReactRouter

const {
    Header,
    Content,
    Footer,
    Reload
} = require('../components/Layout')

const {
    Alert,
    Toast
} = require('../components/Weui')
class Layout extends React.Component {
    constructor() {
        super()
    }
    _onChange() {
        let config = ConfigStore.getAll()
        console.log(config)
        window.document.title = config.title
        this.setState(config)
    }
    componentDidMount() {
        ConfigStore.addChangeListener(this._onChange.bind(this))
        // setTimeout(function() {
        //     Tip({ title: '23232', content: 'haode aadsa!' })
        // }, 3000);
    }
    componentWillUpdate(nextProps, nextState) {

    }
    componentWillUnmount() {
        ConfigStore.removeChangeListener(this._onChange.bind(this))
    }
    render() {
        return (
            React.createElement('div', {
                id: 'warper',
            },
                React.createElement(Header),
                this.props.children,
                React.createElement(Footer),
                React.createElement(Alert, { g: true }),
                React.createElement(Toast)
            )
        )
    }
}
module.exports = Layout