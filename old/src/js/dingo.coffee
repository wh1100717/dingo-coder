define (require, exports, module) ->
    "use strict"

    Editor = require("./editor")
    Mode = require("./module/mode")
    # Service = require("./service/service")
    Service = {}

    #For Test
    window.service = Service

    Dingo = {}

    Dingo.init = ->
        Polymer "dingo-coder", {
            icon:"/img/logo.png"
            title: "Dingo Coder"
            layout: 1
            ready: -> @editor = new Editor(@$.editor, @, Service)
            attributeChanged: (attrName, oldVal, newVal) ->
                @editor.set_editor(attrName, newVal) if Mode[attrName]?
                @editor.refresh() if attrName in ["js", "css", "html"]
        }
        return


 
    module.exports = Dingo