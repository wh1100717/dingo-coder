define (require, exports, module) ->
    "use strict"

    CodeMirror = require("codemirror/lib/codemirror")
    beautify = require("../module/beautify/index")

    class Editor

        constructor: (@container, @attrs) ->
            @container = $(@container)
            @ifr_init()
            @editor_init()
            @event_bind()

        mode: {
            js: "javascript"
            javascript: "javascript"
            html: "htmlmixed"
            css: "css"
            velocity: "velocity"
            sass: "sass"
            java: "jade"
        }

        type: {
            css: "text/css"
            js: "text/js"
            javascript: "text/js"
            html: "text/html"
            sass: "text/x-sass"
            java: "text/x-java"
            velocity: "text/velocity"
        }


        ifr_init: ->
            @ifr = document.createElement("iframe")
            @ifr.id = "ifr_coder"
            @ifr.scrolling = "no"
            @ifr.setAttribute("class","renderer coder")
            @ifr.setAttribute("scrolling","yes")
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
            @flag = 0
            window.codeList = $("<div>#{@attrs.innerHTML}</div>")
            codeList.find("textarea").each ->
                self.flag++
                code_type = $(@).attr("code")
                require ["codemirror/mode/#{self.mode[code_type]}/#{self.mode[code_type]}"], =>
                    self.flag--
                    menu = $("<div class='mode-tab ' codetype='code#{code_type}'>#{code_type}<div class='arrow-up '></div></div>")
                    self.container.find("#mode-tabs").append(menu)
                    codemirrorinit = document.createElement("textarea")
                    codemirrorinit.id = "code" + code_type
                    self.container.find("#code-editor").append(codemirrorinit)
                    self["#{code_type}_editor"] = CodeMirror.fromTextArea self.container.find("#" + codemirrorinit.id)[0], {
                        theme: "monokai"
                        lineNumbers: true
                        matchBrackets: true
                        mode: "#{self.type[code_type]}"
                    }
                    self.container.find("#code#{code_type}").next().prepend("<div class='remind'>#{code_type}</div>")
                    code_content = $(@).val()
                    code_content = self.code_format(code_type, code_content)
                    self.attrs.setAttribute(code_type, code_content)
                    if code_type is "js"
                        self["#{code_type}_editor"].on "change", =>
                            clearTimeout(self.timeout)
                            self.timeout = setTimeout(=>
                                self.ifr_refresh()
                            , 700)
                    else self["#{code_type}_editor"] .on "change", => self.ifr_refresh()
            querycheck = setInterval =>
                return if @flag isnt 0
                # way 1
                # @container.find("div[codetype='codehtml']").prependTo(@container.find("#mode-tabs"))
                # @container.find(".mode-tab").eq(0).addClass("active")
                # @container.find("#codehtml").next().prependTo(@container.find("#code-editor"))
                # @container.find("#codehtml").prependTo(@container.find("#code-editor"))
                # way 2
                @container.find("div[codetype='codehtml']").prependTo(@container.find("#mode-tabs"))
                @container.find(".mode-tab").eq(0).trigger "click"
                clearInterval(querycheck)
            , 20
            return




        code_format: (type, content) ->
            content = content.trim()
            switch type
                when "html" then content = beautify.html_beautify(content)
                when "css" then content = beautify.css_beautify(content)
                when "js" then content = beautify.js_beautify(content)
            return content

        set_editor: (type, val) ->
            @["#{type}_editor"].getDoc().setValue(val)

        set_layout: ->
            @container.find(".CodeMirror").removeClass("expansiondown expansionup")
            @container.find("#mode-tabs").removeClass("tabup tabdown")
            switch @attrs.layout
                when 1
                    @container.find("#mode-tabs").removeClass("tabup").addClass("tabdown")
                    # @container.find(".remind").remove()
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

        event_bind: ->
            self = @
            @container.find("#mode-tabs").delegate "div","click", ->
                return if $(@).hasClass("active")
                self.container.find(".mode-tab").removeClass("active")
                $(@).addClass("active")
                self.container.find(".CodeMirror").removeClass("expansiondown")
                self.container.find(".CodeMirror").hide()
                toshow = $(@).attr("codetype")
                self.container.find("##{toshow}").next().show()
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