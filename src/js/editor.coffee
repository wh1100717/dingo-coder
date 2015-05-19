define (require, exports, module) ->
    "use strict"

    Iframe = require("../module/iframe")
    Coder = require("../module/coder")
    Layout = require("../module/layout")

    class Editor

        constructor: (@container, @element) ->
            @container = $(@container)
            @ifr = new Iframe(@container, @)
            @coder = new Coder(@container, @, @element)
            @layout = new Layout(@container, @element)

        set_editor: (type, val) -> @["#{type}_editor"].getDoc().setValue(val)

        set_layout: -> @layout.set_layout()
 
        refresh: -> @ifr.refresh()

    module.exports = Editor