define (require, exports, module) ->
    "use strict"

    Iframe = require("./module/iframe")
    Coder = require("./module/coder")
    Layout = require("./module/layout")

    class Editor

        constructor: (@container, @element, @service) ->
            $("#logo").attr("src", @element.icon)
            $("#title").html(@element.name)
            @container = $(@container)
            @ifr = new Iframe(@)
            @coder = new Coder(@)
            @layout = new Layout(@)
            if @element.code is false
                $(".iframeread.active").click()
            else if @element.preview is false
                $(".coderead.active").click()

        set_editor: (type, val) -> @["#{type}_editor"].getDoc().setValue(val)

        set_layout: -> @layout.set_layout()
 
        refresh: -> @ifr.refresh()

    module.exports = Editor