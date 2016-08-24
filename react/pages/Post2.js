'use strict'

const {
    Content
} = require('../components/Layout')
class Post extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        ConfigActions.update('title', 'post2')
    }
    componentWillReceiveProps() {
        console.log(ConfigStore.get('refresh'))
    }
    render() {
        return (
            React.createElement(Content, {},
                React.createElement('div', {
                        className: 'form-group'
                    },
                    '22222222222222222223'
                )
            )
        )
    }
}

module.exports = Post