'use strict'
import './less/style.less'
require('./global')
/**
 * 路由
 */
 
const {
    Router,
    Route,
    IndexRoute,
    IndexRedirect,
    Redirect,
    hashHistory,
    browserHistory
} = ReactRouter

const {
    Layout,
    Nomatch,
    Home,
    Post,
    Post2,
    Weui
} = require('./pages')

function onEnter(nextState, replace) {
    let pathname = nextState.location.pathname
    let user = storedb('user').find() ? true : false
    // console.log(storedb('user').find());
    if (!user && pathname !== 'login' && pathname !== '/login') {
        ConfigActions.update('msg', '你还没有登录，请先登录！')
        replace({
            pathname: '/login'
        })
    } else if (user && (pathname == 'login' || pathname == '/login')) {
        replace({
            pathname: '/'
        })
    }
}

const routers = (
    React.createElement(Router, { history: hashHistory },
        React.createElement(Route, { path: "/", component: Layout },
            React.createElement(IndexRoute, { component: Home }),
            React.createElement(Route, { path: "post", component: Post }),
            React.createElement(Route, { path: "post2", component: Post2 }),
            React.createElement(Route, { path: "weui", component: Weui }),
            React.createElement(Route, { path: "*", component: Nomatch })
        )
    )
)

ReactDOM.render(routers, document.getElementById('app'))
