do ->

    Polymer "dingo-coder", {
        html: ""
        css: ""
        js: ""
        icon:"/img/logo.png"
        title: "Dingo Coder"
        layout: 1
        ready: -> @editor = new Editor(@$.editor, @)
        htmlChanged: (oldVal, newVal) -> @editor.set_editor("html", newVal)
        cssChanged: (oldVal, newVal) -> @editor.set_editor("css", newVal)
        jsChanged: (oldVal, newVal) -> @editor.set_editor("js", newVal)
        layoutChanged: (oldVal, newVal) -> @editor.set_layout()
    }

    class Editor

        constructor: (@container, @attrs) ->
            @container = $(@container)
            @ifr_init()
            @editor_init()
            @lightdom_init()
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
            @js_editor = CodeMirror.fromTextArea @container.find("#codejs")[0], {
                theme: "monokai"
                lineNumbers: true
                matchBrackets: true
                mode: "text/javascript"
            }
            @css_editor = CodeMirror.fromTextArea @container.find("#codecss")[0], {
                theme: "monokai"
                lineNumbers: true
                matchBrackets: true
                mode: "text/css"
            }
            @html_editor = CodeMirror.fromTextArea @container.find("#codehtml")[0], {
                theme: "monokai"
                lineNumbers: true
                matchBrackets: true
                mode: "text/html"
            }
            return

        lightdom_init: ->
            self = @
            window.codeList = $("<div>#{@attrs.innerHTML}</div>")
            codeList.find("textarea").each ->
                code_type = $(@).attr("code")
                window.test = $(@)
                self.attrs.setAttribute(code_type, $(@).val())
                window.editor = self["#{code_type}_editor"]




        set_editor: (type, val) -> @["#{type}_editor"].getDoc().setValue(val)

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

    return