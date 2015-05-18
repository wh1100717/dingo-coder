define (require, exports, module) ->
    "use strict"

    require("jquery")
    Editor = require("./editor")
    mode = require("../module/mode")

    Element = {}

    Element.init = ->
        Polymer "dingo-coder", {
            icon:"/img/logo.png"
            title: "Dingo Coder"
            layout: 1
            ready: -> @editor = new Editor(@$.editor, @)
            attributeChanged: (attrName, oldVal, newVal) -> @editor.set_editor(attrName, newVal) if mode[attrName]?
        }

 
    module.exports = Element