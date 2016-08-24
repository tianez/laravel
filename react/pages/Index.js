'use strict'

const Layout = require('./Layout')
const Nomatch = require('./Nomatch')
const Home = require('./Home')
const Post = require('./Post')
const Post2 = require('./Post2')

var Temp = {
    Layout: Layout,
    Nomatch: Nomatch,
    Home: Home,
    Post: Post,
    Post2: Post2,
    Weui: require('./Weui')
}
module.exports = Temp