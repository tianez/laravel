'use strict'
/**
 * action
 */
window.ConfigActions = require('./flux/ConfigActions')

/**
 * store
 */
window.ConfigStore = require('./flux/ConfigStore')

require('./components/Weui/global')

window.Reloaded = function () {
    ConfigActions.update('loaded', true)
}

//获取url参数数组
window.get = function (url) {
    if (!url) {
        var url = window.document.location.href.toString();
    }
    var u = url.split("?");
    if (typeof (u[1]) == "string") {
        u = u[1].split("&");
        var get = {};
        for (var i in u) {
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
}

//2个对象合并
window.extend = function (o, n, override) {
    for (var p in n)
        if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) o[p] = n[p];
}

window.GetRequest = function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

// 屏幕旋转
window.onorientationchange = function () {
    switch (window.orientation) {
        case -90:
        case 90:
            alert("横屏:" + window.orientation);
        case 0:
        case 180:
            alert("竖屏:" + window.orientation);
            break;
    }
}

// audio元素和video元素在ios和andriod中无法自动播放
// 应对方案：触屏即播
// $('html').one('touchstart', function() {
//     audio.play()
// })