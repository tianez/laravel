'use strict'

var Home = React.createClass({
    getInitialState: function() {
        return {
            items: ['hello', 'world', 'click', 'me']
        };
    },
    componentDidMount: function() {
    },
    handleSelect: function(data) {
        console.log(data); // Momentjs object
        console.log(data.format('YYYY-MM-D HH d')); // Momentjs object
    },
    updateHtml: function(html) {
        this.setState({
            html: html
        })
    },
    render: function() {
        return (
            React.createElement('div', {
                    className: 'container pure-g'
                },
                React.createElement('div', {
                        className: 'pure-u-1'
                    },
                    // React.createElement('div', {
                    //     dangerouslySetInnerHTML: {
                    //         __html: this.state.html
                    //     }
                    // })
                )
            )
        )
    }
});

module.exports = Home
