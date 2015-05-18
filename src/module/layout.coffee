define (require, exports, module) ->
    "use strict"

    class Layout
        constructor: (@container, @attrs) ->

        set_layout: ->
            @container.find(".CodeMirror").removeClass("expansiondown expansionup")
            @container.find("#mode-tabs").removeClass("tabup tabdown")
            switch @attrs.layout
                when 1
                    @container.find("#mode-tabs").removeClass("tabup").addClass("tabdown")
                    @container.find(".remind").remove()
                    @container.find(".CodeMirror").removeClass("expansionup").addClass("expansiondown")
                    @container.find(".mode-tab").removeClass("active")
                    @container.find(".mode-tab").eq(0).addClass("active")
                when 2
                    @container.find("#mode-tabs #file-dropdown-toggle #file-dropdown").hide()
                    @container.find(".CodeMirror").show().addClass("expansionup")
                    @container.find("#mode-tabs").addClass("tabup")
                    @container.find(".CodeMirror").eq(0).prepend("<div class='remind'>HTML</div>")
                    @container.find(".CodeMirror").eq(1).prepend("<div class='remind'>CSS</div>")
                    @container.find(".CodeMirror").eq(2).prepend("<div class='remind'>JS</div>")
                else
                    @attrs.layout = 1
                    @set_layout()
            return

        enter_fullscreen: ->
            @container[0].requestFullscreen?()
            @container[0].msRequestFullscreen?()
            @container[0].mozRequestFullScreen?()
            @container[0].webkitRequestFullscreen?()
            return

        exit_fullscreen: ->
            document.exitFullscreen?()
            document.msExitFullscreen?()
            document.mozCancelFullScreen?()
            document.webkitExitFullscreen?()
            return

    module.exports = Layout