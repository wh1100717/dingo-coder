define (require, exports, module) ->
    "use strict"

    Iframe = require("../module/iframe")
    Coder = require("../module/coder")
    Layout = require("../module/layout")

    class Editor

        constructor: (@container, @element, @service) ->
            @container = $(@container)
            @ifr = new Iframe(@)
            @coder = new Coder(@)
            @layout = new Layout(@)

        set_editor: (type, val) -> @["#{type}_editor"].getDoc().setValue(val)

        set_layout: -> @layout.set_layout()
 
        refresh: -> @ifr.refresh()

    module.exports = Editor