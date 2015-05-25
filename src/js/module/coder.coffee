define (require, exports, module) ->
    "use strict"

    CodeMirror = require("codemirror/lib/codemirror")
    mode = require("./mode")
    beautify = require("../lib/beautify")

    class Coder
        constructor: (@editor) ->
            @container = @editor.container
            @element = @editor.element
            @event_bind()
            @typelist = []
            flag = 0
            self = @

            $.each @element.codes, ->
                flag++
                code_type = @type
                code_value = @value
                self.typelist.push(code_type)
                require ["codemirror/mode/#{mode[code_type].mode}/#{mode[code_type].mode}"], =>
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
                    code_content = @value
                    code_content = self.code_format(code_type, code_content)
                    if code_type in ["js", "css", "html"]
                        self.editor["#{code_type}_editor"].on "change", -> self.editor.ifr.refresh()
                    self.editor["#{code_type}_editor"].doc.setValue(code_content)
             
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
                if self.container.find(".type").hasClass("typedown")
                    self.container.find(".type .row").animate({"top":"10%"},300)
                    self.container.find(".signinput").animate({"margin-top": "-70%"},500).addClass("show")
                    self.container.find(".signupput").animate({"margin-top":"-70%";"margin-left":"105%"},0)
                    self.container.find(".type").removeClass("typedown")
                else
                    if (self.container.find(".signinput").hasClass("show"))
                        self.container.find(".type .row").animate({"top":"50%"},500)
                        self.container.find(".signinput").animate({"margin-top":"0"},500).removeClass("show")
                        self.container.find(".signupput").animate({"margin-top":"0";"margin-left":"5%"},0)
                        self.container.find(".type").addClass("typedown")
                    else
                        self.container.find(".signupput").animate({"margin-left":"105%"},500).removeClass("show")
                        self.container.find(".signinput").animate({"margin-left":"5%"},500).addClass("show")

            @container.find(".signup").on "click", ->
                if self.container.find(".type").hasClass("typedown")
                    self.container.find(".type .row").animate({"top":"10%"},300)
                    self.container.find(".signupput").animate({"margin-top": "-70%"},500).addClass("show")
                    self.container.find(".signinput").animate({"margin-top":"-70%";"margin-left":"-95%"},0)
                    self.container.find(".type").removeClass("typedown")
                else
                    if(self.container.find(".signupput").hasClass("show"))
                        self.container.find(".type .row").animate({"top":"50%"},500)
                        self.container.find(".signupput").animate({"margin-top":"0"},500).removeClass("show")
                        self.container.find(".signinput").animate({"margin-top":"0";"margin-left":"5%"},0)
                        self.container.find(".type").addClass("typedown")
                    else
                        self.container.find(".signupput").animate({"margin-left":"5%"},500).addClass("show")
                        self.container.find(".signinput").animate({"margin-left":"-95%"},500).removeClass("show")

            @container.find("#signin").on "click", ->
                email = self.container.find("input[type ='mail']").val()
                password = self.container.find("input[type ='password']").val()
                self.editor.service.authService.login(email, password, (error, data) ->
                    if error isnt null then console.log error
                    else console.log data)

            @container.find("#signup").on "click", ->
                email = self.container.find("input[type = 'mailsignup']").val()
                password = self.container.find("input[type = 'passwordsignup']").val()
                self.editor.service.authService.register(email, password, (error, data) ->
                    if error isnt null then console.log error
                    else self.editor.service.authService.login(email, password, (error, data) ->
                        if error isnt null then console.log error
                        else console.log data))

            @container.find(".nameless").on "click", ->
                self.editor.service.authService.anonymouslogin (error, data) ->
                    if error isnt null then console.log error
                    else console.log data

            @container.find("#forget").on "click", ->
                email = self.container.find("input[type ='mail']").val()
                self.editor.service.authService.resetPassword(email, (error, data) -> console.log error)

            @container.find(".facebook").on "click", ->
                self.editor.service.authService.thirdpartylogin("facebook", (error, data) ->
                    console.log error)
            @container.find(".github").on "click", ->
                self.editor.service.authService.thirdpartylogin("github", (error, data) ->
                    console.log error)
            @container.find(".twitter").on "click", ->
                self.editor.service.authService.thirdpartylogin("twitter", (error, data) ->
                    console.log error)
            @container.find(".google").on "click", ->
                self.editor.service.authService.thirdpartylogin("google", (error, data) ->
                    console.log error)










    module.exports = Coder