define (require, exports, module) ->
    "use strict"

    Iframe = require("../module/iframe")
    Coder = require("../module/coder")
    Layout = require("../module/layout")

    class Editor

        constructor: (@container, @attrs) ->
            @container = $(@container)
            @ifr = new Iframe(@container, @)
            @coder = new Coder(@container, @, @attrs)
            @layout = new Layout(@container, @attrs)
            @event_bind()

        set_editor: (type, val) -> @["#{type}_editor"].getDoc().setValue(val)

        set_layout: -> @layout.set_layout()


        event_bind: ->
            self = @
            @container.find("#mode-tabs").delegate "div","click", ->
                return if $(@).hasClass("active")
                self.container.find(".mode-tab").removeClass("active")
                $(@).addClass("active")
                self.container.find(".CodeMirror").removeClass("expansiondown")
                self.container.find(".CodeMirror").hide()
                toshow = $(@).attr("codetype")
                console.log toshow
                self.container.find("##{toshow}").next().show()

            @container.find("#toggle-full-screen").click ->
                if $(@).hasClass("full-screen-enabled") then self.layout.exit_fullscreen() else self.layout.enter_fullscreen()
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

            @container.find(".mode").on "click", => @attrs.layout++


 
    module.exports = Editor