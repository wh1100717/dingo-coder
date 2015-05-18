define (require, exports, module) ->
    "use strict"

    CodeMirror = require("codemirror/lib/codemirror")
    require("codemirror/mode/htmlmixed/htmlmixed")
    require("codemirror/mode/css/css")
    require("codemirror/mode/javascript/javascript")
    require("codemirror/mode/velocity/velocity")

    class Editor

        constructor: (@container, @attrs) ->
            @container = $(@container)
            @ifr_init()
            @editor_init()
            @event_bind()

        ifr_init: ->
            @ifr = document.createElement("iframe")
            @ifr.id = "ifr_coder"
            @ifr.scrolling = "no"
            @ifr.setAttribute("class","renderer coder")
            @container.find("#renderer-container").append(@ifr)
            return

        ifr_refresh: ->
            try
                doc = @html_editor.doc.getValue().trim()
                doc = "<div></div>" if doc is ""
                @ifr.contentWindow.document.close()
                @ifr.contentWindow.document.write(doc)
                style = document.createElement("style")
                script = document.createElement("script")
                style.textContent = @css_editor.doc.getValue()
                script.text = @js_editor.doc.getValue()
                @ifr.contentWindow.document.head.appendChild(style)
                @ifr.contentWindow.document.body.appendChild(script)
            return

        editor_init: ->
            self = @
            window.codeList = $("<div>#{@attrs.innerHTML}</div>")
            codeList.find("textarea").each ->
                code_type = $(@).attr("code")
                bar = $("<div class='mode-tab '>#{code_type}<div class='arrow-up arrow-#{code_type}'></div></div>")
                self.container.find("#mode-tabs").append(bar)
                div = document.createElement("textarea")
                div.id = "code" + code_type
                self.container.find("#code-editor").append(div)
                self["#{code_type}_editor"] = CodeMirror.fromTextArea self.container.find("#" + div.id)[0], {
                    theme: "monokai"
                    lineNumbers: true
                    matchBrackets: true
                    mode: "text/" + code_type
            }
                console.log code_type
                self.attrs.setAttribute(code_type, $(@).val())
            return


        set_editor: (type, val) ->
            @["#{type}_editor"].getDoc().setValue(val)
            # console.log val

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

        event_bind: ->
            self = @
            @container.find(".mode-tab").on "click", ->
                return if $(@).hasClass("active")
                index = self.container.find(".mode-tab").index(@)
                self.container.find(".mode-tab").removeClass("active")
                $(@).addClass("active")
                self.container.find(".CodeMirror").removeClass("expansiondown")
                self.container.find(".CodeMirror").hide()
                self.container.find(".CodeMirror").eq(index).show()
            @css_editor.on "change", => @ifr_refresh()
            @html_editor.on "change", => @ifr_refresh()
            @velocity_editor.on "change", => @ifr_refresh()
            @js_editor.on "change", =>
                clearTimeout(@timeout)
                @timeout = setTimeout(=>
                    @ifr_refresh()
                , 700)
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

            @container.find(".mode").on "click", => @attrs.layout++

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
 
    module.exports = Editor