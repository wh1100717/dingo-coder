define (require, exports, module) ->
    "use strict"

    Editor = require("./editor")
    Mode = require("./module/mode")
    Service = require("./service/service")
    # Service = {}

    #For Test
    window.service = Service

    bind = (el, eve, fn, priority) ->
        _isIE = if window.addEventListener? then false else true
        el[if _isIE then "attachEvent" else "addEventListener"]("#{if _isIE then "on" else ""}#{eve}", fn, priority or false)

    Dingo = {}

    Dingo.init = ->
        bind window, "message", (e) ->
            Dingo.element = JSON.parse e.data
            console.log "From postMessage", Dingo.element
            new Editor($("#editor"), Dingo.element, Service)

    module.exports = Dingo