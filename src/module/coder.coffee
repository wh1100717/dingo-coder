define (require, exports, module) ->
    "use strict"

    CodeMirror = require("codemirror/lib/codemirror")
    beautify = require("./beautify/index")
    mode = require("./mode")

    class Coder
        constructor: (@container, @editor, @attrs) ->
            self = @
            flag = 0
            codeList = $("<div>#{@attrs.innerHTML}</div>")
            codeList.find("textarea").each ->
                flag++
                code_type = $(@).attr("code")
                require(["codemirror/mode/#{mode[code_type]}/#{mode[code_type]}"], =>
                    flag--
                    menu = $("<div class='mode-tab' codetype='code#{code_type}'>#{code_type}<div class='arrow-up '></div></div>")
                    self.container.find("#mode-tabs").append(menu)
                    codemirrorinit = document.createElement("textarea")
                    codemirrorinit.id = "code" + code_type
                    self.container.find("#code-editor").append(codemirrorinit)
                    self.editor["#{code_type}_editor"] = CodeMirror.fromTextArea self.container.find("#" + codemirrorinit.id)[0], {
                        theme: "monokai"
                        lineNumbers: true
                        matchBrackets: true
                        mode: "text/" + code_type
                    }
                    code_content = $(@).val()
                    code_content = self.code_format(code_type, code_content)
                    self.attrs.setAttribute(code_type, code_content)
                    if code_type is "js"
                        self.editor["#{code_type}_editor"].on "change", ->
                            clearTimeout(self.timeout)
                            self.timeout = setTimeout(->
                                self.editor.ifr.refresh()
                            , 700)
                    else self.editor["#{code_type}_editor"] .on "change", -> self.editor.ifr.refresh()
                )
            querycheck = setInterval =>
                return if flag isnt 0
                @container.find(".mode-tab").eq(0).addClass("active")
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

    module.exports = Coder