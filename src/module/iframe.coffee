define (require, exports, module) ->
    "use strict"

    class Iframe
        constructor: (@container, @editor) ->
            @ifr = document.createElement("iframe")
            @ifr.id = "ifr_coder"
            @ifr.scrolling = "yes"
            @ifr.frameborder = 0
            @ifr.setAttribute("class","renderer coder")
            @container.find("#renderer-container").append(@ifr)
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
        deleteiframe: ->
            @container.find("iframe").remove()
            @container.find(".coderead").trigger "click"
            @container.find(".coderead").unbind()
            @container.find(".iframeread").removeClass("active").unbind()

    module.exports = Iframe