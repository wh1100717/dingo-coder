do ->

    _isType = (type) -> (obj) -> toString.call(obj).toLowerCase() is "[object #{type}]".toLowerCase()

    isType = (ele, type) -> _isType(type)(ele)

    isObject = _isType "object"

    isString = _isType "string"

    isNumber = _isType "number"

    isArray = _isType "array"

    isFunction = _isType "function"

    isRegex = _isType "regexp"

    bind = (el, eve, fn, priority) ->
        _isIE = if window.addEventListener? then false else true
        el[if _isIE then "attachEvent" else "addEventListener"]("#{if _isIE then "on" else ""}#{eve}", fn, priority or false)

    createIframe = (dingo) ->
        iframe = document.createElement "iframe"
        iframe.src = dingo.server
        iframe.frameborder = 0
        iframe.width = dingo.container.offsetWidth
        iframe.height = Math.max(dingo.container.offsetHeight, 500)
        iframe.setAttribute("style", "border: none;")
        dingo.container.appendChild(iframe)
        return iframe

    sendMessage = (data, dingo, callback) ->
        ifrWin = dingo.iframe.contentWindow
        ###
         *  当加载非同源iframe时，不能简单的通过 iframe.contentWindow.document.readystate来判断页面是否为complete
         *  第一: readystate为complete不代表server端的localDB初始化完成
         *  第二: 一旦非同源iframe加载完成，则无法访问到readystate
         *  因此通过能否访问到iframe.contentWindow.document来判断其是否完成加载
            *   如果能访问到，则给iframe的load事件增加函数
            *   如果不能访问到，则直接iframe.contentWindow.postMessage发送请求
        ###
        try
            ifrWin.document
            bind dingo.iframe, "load", ->
                ifrWin.postMessage data, dingo.server
            ###
             *  在同域下，即使页面完成加载仍然可以获取到ifrWin.document
             *  但是页面已经加载完了，load事件不会再执行会导致postMessage没有发出去
             *  所以除了绑定load事件外也直接发送postMessage请求
             *  对应Iframe里面事件绑定改为once类型
            ###
            ifrWin.postMessage data, dingo.server
        catch e
            ifrWin.postMessage data, dingo.server

    syncEditor = (dingo, callback) ->
        code = JSON.stringify(dingo.editor)
        sendMessage(code, dingo, callback)

    Polymer "dingo-coder", {
        icon:"./img/logo.png"
        name: "Dingo Coder"
        layout: 1
        code: true
        preview: true
        ready: ->
            Dingo = {
                server: "http://localhost:9008/dingo.html"
                container: null
                iframe: null
                editor: {
                    #@todo 这里是有问题的，如果存在多个Dingo-coder 则会产生冲突
                    origin: window.location.href
                    codes: []
                }
            }
            codeList = document.createElement("div")
            codeList.innerHTML = @innerHTML
            codes = codeList.getElementsByTagName("textarea")
            for code in codes
                if code.getAttribute("target") is "css"
                    Dingo.editor.css = code.value
                continue if not code.getAttribute("code")?
                Dingo.editor.codes.push {
                    type: code.getAttribute("code")
                    value: code.value
                }
            Dingo.editor.icon = @icon
            Dingo.editor.name = @name
            Dingo.editor.layout = @layout
            Dingo.editor.code = @code
            Dingo.editor.preview = @preview
            Dingo.container = @$.container
            Dingo.iframe = createIframe(Dingo)
            window.addEventListener "messsage", (e) ->
                console.log "what the fuck!"
                console.log e
            # bind window, "messsage", (e) ->
            #     #@todo 这里也是有问题的
            #     console.log e
            syncEditor(Dingo)
    }


