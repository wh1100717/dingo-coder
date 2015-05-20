define (require, exports, module) ->
    "use strict"

    class Iframe
        constructor: (@editor) ->
            @container = @editor.container
            @element = @editor.element
            @judgeiframe()
            if (@setiframe)
                console.log "yes"
                @ifr = document.createElement("iframe")
                @ifr.id = "ifr_coder"
                @ifr.scrolling = "yes"
                @ifr.frameborder = 0
                @ifr.setAttribute("class","renderer coder")
                @container.find("#renderer-container").append(@ifr)
            else
                @ifr = null
                console.log @ifr
                console.log "noiframe"

        judgeiframe: ->
            self = @
            @setiframe = false
            @codeList = $("<div>#{@element.innerHTML}</div>")
            @codeList.find("textarea").each ->
                code_type = $(@).attr("code")
                console.log code_type
                if code_type is "html" then self.setiframe = true
            return
        refresh: ->
            try
                doc = @editor.html_editor.doc.getValue().trim()
                doc = "<div></div>" if doc is ""
                @ifr.contentWindow.document.close()
                @ifr.contentWindow.document.write(doc)
                style = document.createElement("style")
                script = document.createElement("script")
                style.textContent = @editor.css_editor.doc.getValue()
                script.text = @editor.js_editor.doc.getValue()
                @ifr.contentWindow.document.head.appendChild(style)
                @ifr.contentWindow.document.body.appendChild(script)
            return
        remove: ->
            @container.find(".coderead").trigger "click"
            @container.find(".coderead").unbind()
            @container.find(".iframeread").removeClass("active").unbind()

    module.exports = Iframe