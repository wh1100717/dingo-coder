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
        flag = false
        init_interval = setInterval ->
            console.log "init_interval"
            return if not window._dingo_element?
            clearInterval(init_interval)
            Dingo.element = window._dingo_element
            new Editor($("#editor"), Dingo.element, Service)
        , 100


    module.exports = Dingo