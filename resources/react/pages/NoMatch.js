'use strict';

class Nomatch extends React.Component {
    render() {
        return (
            React.createElement('div', {
                className: 'warp'
            },
                '没有发现对应的页面！'
            )
        )
    }
}
module.exports = Nomatch;