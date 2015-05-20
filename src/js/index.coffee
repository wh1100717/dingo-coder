define (require, exports, module) ->
    "use strict"

    require("jquery")
    Editor = require("./editor")
    Service = require("./service/service")
    mode = require("./module/mode")

    Index = {}

    Index.init = ->
        service = new Service()
        Polymer "dingo-coder", {
            icon:"/img/logo.png"
            title: "Dingo Coder"
            layout: 1
            ready: -> @editor = new Editor(@$.editor, @, service)
            attributeChanged: (attrName, oldVal, newVal) ->
                @editor.set_editor(attrName, newVal) if mode[attrName]?
                @editor.refresh() if attrName in ["js", "css", "html"]
        }
        return


 
    module.exports = Index