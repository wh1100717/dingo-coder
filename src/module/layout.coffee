define (require, exports, module) ->
    "use strict"

    class Layout
        constructor: (@editor) ->
            @container = @editor.container
            @element = @editor.element
            @event_bind()

        set_layout: ->
            @container.find(".CodeMirror").removeClass("expansiondown expansionup")
            @container.find("#mode-tabs").removeClass("tabup tabdown")
            switch @element.layout
                when 1
                    @container.find("#mode-tabs").removeClass("tabup").addClass("tabdown")
                    @container.find(".CodeMirror").removeClass("expansionup").addClass("expansiondown")
                    @container.find(".mode-tab").removeClass("active")
                    @container.find(".mode-tab").eq(0).trigger "click"
                when 2
                    # 也要判断下有没三块
                    if @editor.coder.typelist.length > 2
                        @container.find("#mode-tabs #file-dropdown-toggle #file-dropdown").hide()
                        @container.find(".CodeMirror").show().addClass("expansionup")
                        @container.find("#mode-tabs").addClass("tabup")
                    else
                        @element.layout++
                        @set_layout()

                when 3
                    # 要判定下有没有iframe而且有没有三块,注意iframe的判定可以放在初始化
                    @container.find("#mode-tabs").hide()
                    @container.find(".CodeMirror").hide()
                    @container.find("#mode-tabs #file-dropdown-toggle #file-dropdown").hide()
                    @outerheight = @container.find("#code-editor").height()
                    if @editor.coder.typelist.length > 2 and @editor.coder.ififrame is true
                        @outerheight = (@outerheight + 35) / 2
                        @container.find(".CodeMirror").eq(0).show().removeClass("expansionup").css("height","#{@outerheight}")
                        @container.find(".CodeMirror").eq(1).show().removeClass("expansionup").css("height","#{@outerheight}")
                        @container.find(".renderer").css({"height":"50%"})
                        @container.find(".CodeMirror").eq(2).prev().appendTo(@container.find("#renderer-container"))
                        @container.find(".CodeMirror").eq(2).show().removeClass("expansionup").css({"height":"50%";"position":"relative";"top":"50%"}).appendTo(@container.find("#renderer-container"))
                    else
                        @element.layout++
                        @set_layout()
                when 4
                    if @editor.coder.typelist.length > 2 and @editor.coder.ififrame is true
                        @container.find("#renderer-container").children().eq(2).insertAfter(@container.find("#code-editor .CodeMirror").eq(1))
                        @container.find("#renderer-container").children().eq(1).insertAfter(@container.find("#code-editor .CodeMirror").eq(1))
                        @container.find(".renderer").css({"height":"100%"})
                    else if @editor.coder.typelist.length is 2
                        @outerheight = (@outerheight + 35) / 2
                        @container.find(".CodeMirror").show().css("height","#{@outerheight}")
                    else if @editor.coder.typelist.length is 1
                        @outerheight = @outerheight * 2
                        @container.find(".CodeMirror").show().css("height","#{@outerheight}")
                    else
                        @element.layout++
                        @set_layout()

                else
                    @container.find("#mode-tabs").show().addClass("tabdown")
                    @outerheight = @container.find("#code-editor").height()
                    @container.find(".CodeMirror").css("height","#{@outerheight}")
                    @container.find(".CodeMirror").eq(2).css("top":"0")
                    @element.layout = 1
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
                self.container.find("#setting-panel").animate {
                    left: if $(@).hasClass("active") then "-50%" else "0%"
                }, 500


    module.exports = Layout