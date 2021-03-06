define (require, exports, module) ->
    "use strict"

    CodeMirror = require("codemirror/lib/codemirror")
    mode = require("./mode")
    beautify = require("../lib/beautify")

    class Coder
        constructor: (@editor) ->
            @container = @editor.container
            @element = @editor.element
            self = @
            flag = 0
            @event_bind()
            @typelist = []
            @editor.ifr.codeList.find("textarea").each ->
                flag++
                code_type = $(@).attr("code")
                self.typelist.push(code_type)
                require(["codemirror/mode/#{mode[code_type].mode}/#{mode[code_type].mode}"], =>
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
                        mode: "#{mode[code_type].type}"
                    }
                    self.container.find("#code#{code_type}").next().prepend("<div class='remind'>#{code_type}</div>")
                    code_content = $(@).val()
                    code_content = self.code_format(code_type, code_content)
                    self.element.setAttribute(code_type, code_content)
                    if code_type in ["js", "css", "html"]
                        self.editor["#{code_type}_editor"].on "change", -> self.editor.ifr.refresh()
                )
            querycheck = setInterval =>
                return if flag isnt 0
                @editor.ifr.remove() if @editor.ifr.ifr is null
                @typelist = @typelist.reverse()
                @fixlist i for i in @typelist
                @container.find(".mode-tab").eq(0).trigger "click"
                clearInterval(querycheck)
            , 100
            return
        fixlist: (i) ->
            @container.find("div[codetype=code#{i}]").prependTo(@container.find("#mode-tabs"))
            @container.find("#code#{i}").next().prependTo(@container.find("#code-editor"))
            @container.find("#code#{i}").prependTo(@container.find("#code-editor"))

        code_format: (type, content) ->
            content = content.trim()
            switch type
                when "html" then content = beautify.html_beautify(content)
                when "css" then content = beautify.css_beautify(content)
                when "js" then content = beautify.js_beautify(content)
            return content

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

            @container.find(".mode").on "click", =>
                @element.layout++
                self.editor.layout.set_layout()

            @container.find(".login").on "click", ->
                self.container.find(".type").toggleClass("typedown")
                if self.container.find(".type").hasClass("typedown")
                    self.container.find(".type").animate({"margin-top":"10%"},500)
                    self.container.find(".signinput").animate({"margin-top": "40%"},500)
                else
                    self.container.find(".type").animate({"margin-top":"50%"},500)
                    self.container.find(".signinput").animate({"margin-top":"100%"},500)

            @container.find("#login").on "click", ->
                email = self.container.find("input[type='mail']").val()
                password = self.container.find("input[type='password']").val()
                self.editor.service.authService.login(email, password, (error, data) -> console.log error)

            @container.find(".signup").on "click", ->



    module.exports = Coder