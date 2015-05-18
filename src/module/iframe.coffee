define (require, exports, module) ->
    "use strict"

    class Iframe
        constructor: (@container, @editor) ->
            @ifr = document.createElement("iframe")
            @ifr.id = "ifr_coder"
            @ifr.scrolling = "no"
            @ifr.setAttribute("class","renderer coder")
            @ifr.setAttribute("scrolling","yes")
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

    module.exports = Iframe