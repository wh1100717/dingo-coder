define (require, exports, module) ->
    "use strict"

    class Layout
        constructor: (@container, @attrs) ->
            @event_bind()

        set_layout: ->
            @container.find(".CodeMirror").removeClass("expansiondown expansionup")
            @container.find("#mode-tabs").removeClass("tabup tabdown")
            switch @attrs.layout
                when 1
                    @container.find("#mode-tabs").removeClass("tabup").addClass("tabdown")
                    @container.find(".CodeMirror").removeClass("expansionup").addClass("expansiondown")
                    @container.find(".mode-tab").removeClass("active")
                    @container.find(".mode-tab").eq(0).trigger "click"
                when 2
                    @container.find("#mode-tabs #file-dropdown-toggle #file-dropdown").hide()
                    @container.find(".CodeMirror").show().addClass("expansionup")
                    @container.find("#mode-tabs").addClass("tabup")
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

        event_bind: ->
            self = @
            @container.find("#toggle-full-screen").click ->
                if $(@).hasClass("full-screen-enabled") then self.exit_fullscreen() else self.enter_fullscreen()
                $(@).toggleClass("full-screen-enabled")

            @container.find(".iframeread").click ->
                if not $(@).hasClass("active")
                    $(@).addClass("active")
                    self.container.find(".codepanel").removeClass("narrow").addClass("expansionleft")
                    self.container.find(".renderpanel").removeClass("expansion").addClass("narrowleft")
                else if self.container.find(".coderead").hasClass("active")
                    $(@).removeClass("active")
                    self.container.find(".codepanel").removeClass("expansionleft narrowleft").addClass('narrow')
                    self.container.find(".renderpanel").removeClass("narrowleft expansionleft").addClass('expansion')
                else
                    self.container.find(".coderead").click()
                    setTimeout(->
                        self.container.find(".iframeread").click()
                    , 500)

            @container.find(".coderead").on "click", ->
                if not $(@).hasClass("active")
                    $(@).addClass("active")
                    self.container.find(".renderpanel").removeClass("narrow").addClass("expansionleft")
                    self.container.find(".codepanel").removeClass("expansion").addClass("narrowleft")
                else if self.container.find(".iframeread").hasClass("active")
                    $(@).removeClass("active")
                    self.container.find(".renderpanel").removeClass("expansionleft narrowleft").addClass("narrow")
                    self.container.find(".codepanel").removeClass("narrowleft expansionleft").addClass("expansion")
                else
                    self.container.find(".iframeread").click()
                    setTimeout(->
                        self.container.find(".coderead").click()
                    , 500)
            @container.find(".setting").on "click", ->
                $(@).toggleClass("active")
                if $(@).hasClass("active")
                    self.container.find("#setting-panel").animate({left:"-50%"},500)
                else self.container.find("#setting-panel").animate({left:"0%"},500)


    module.exports = Layout