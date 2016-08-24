window.alert = function (msg) {
    if(!msg){
        msg = []
    }
    msg['show'] = true
    ConfigActions.update('alert', msg)
}

window.toast = function () {
    ConfigActions.update('toast', { show: true })
}