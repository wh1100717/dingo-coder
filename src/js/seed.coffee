do ->
    bind = (el, eve, fn, priority) ->
        _isIE = if window.addEventListener? then false else true
        el[if _isIE then "attachEvent" else "addEventListener"]("#{if _isIE then "on" else ""}#{eve}", fn, priority or false)
    flag = false
    bind window, "message", (e) ->
        return if flag
        flag = true
        window._dingo_element = JSON.parse e.data
        console.log "From postMessage", window._dingo_element

require.config {
    paths: {
        codemirror: "./vendor/codemirror"
        firebase: "./vendor/firebase/firebase"
    }
    shim: {
        firebase: {
            exports: "Firebase"
        }
    }
}