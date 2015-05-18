define (require, exports, module) ->
    "use strict"

    require("jquery")
    Editor = require("./editor")

    Element = {}

    Element.init = ->
        Polymer "dingo-coder", {
            html: ""
            css: ""
            js: ""
            velocity: ""
            icon:"/img/logo.png"
            title: "Dingo Coder"
            layout: 1
            ready: -> @editor = new Editor(@$.editor, @)
            htmlChanged: (oldVal, newVal) -> @editor.set_editor("html", newVal)
            cssChanged: (oldVal, newVal) -> @editor.set_editor("css", newVal)
            jsChanged: (oldVal, newVal) -> @editor.set_editor("js", newVal)
            velocityChanged: (oldVal, newVal) -> @editor.set_editor("velocity", newVal)
            layoutChanged: (oldVal, newVal) -> @editor.set_layout()
           
        }

 
    module.exports = Element