// Generated by CoffeeScript 1.9.2
(function() {
  var _isType, bind, createIframe, isArray, isFunction, isNumber, isObject, isRegex, isString, isType, sendMessage, syncEditor;
  _isType = function(type) {
    return function(obj) {
      return toString.call(obj).toLowerCase() === ("[object " + type + "]").toLowerCase();
    };
  };
  isType = function(ele, type) {
    return _isType(type)(ele);
  };
  isObject = _isType("object");
  isString = _isType("string");
  isNumber = _isType("number");
  isArray = _isType("array");
  isFunction = _isType("function");
  isRegex = _isType("regexp");
  bind = function(el, eve, fn, priority) {
    var _isIE;
    _isIE = window.addEventListener != null ? false : true;
    return el[_isIE ? "attachEvent" : "addEventListener"]("" + (_isIE ? "on" : "") + eve, fn, priority || false);
  };
  createIframe = function(dingo) {
    var iframe;
    iframe = document.createElement("iframe");
    iframe.src = dingo.server;
    iframe.frameborder = 0;
    iframe.width = dingo.container.offsetWidth;
    iframe.height = Math.max(dingo.container.offsetHeight, 500);
    iframe.setAttribute("style", "border: none;");
    dingo.container.appendChild(iframe);
    return iframe;
  };
  sendMessage = function(data, dingo, callback) {
    var e, ifrWin;
    ifrWin = dingo.iframe.contentWindow;

    /*
     *  当加载非同源iframe时，不能简单的通过 iframe.contentWindow.document.readystate来判断页面是否为complete
     *  第一: readystate为complete不代表server端的localDB初始化完成
     *  第二: 一旦非同源iframe加载完成，则无法访问到readystate
     *  因此通过能否访问到iframe.contentWindow.document来判断其是否完成加载
        *   如果能访问到，则给iframe的load事件增加函数
        *   如果不能访问到，则直接iframe.contentWindow.postMessage发送请求
     */
    try {
      ifrWin.document;
      bind(dingo.iframe, "load", function() {
        return ifrWin.postMessage(data, dingo.server);
      });

      /*
       *  在同域下，即使页面完成加载仍然可以获取到ifrWin.document
       *  但是页面已经加载完了，load事件不会再执行会导致postMessage没有发出去
       *  所以除了绑定load事件外也直接发送postMessage请求
       *  对应Iframe里面事件绑定改为once类型
       */
      return ifrWin.postMessage(data, dingo.server);
    } catch (_error) {
      e = _error;
      return ifrWin.postMessage(data, dingo.server);
    }
  };
  syncEditor = function(dingo, callback) {
    var code;
    code = JSON.stringify(dingo.editor);
    return sendMessage(code, dingo, callback);
  };
  return Polymer("dingo-coder", {
    icon: "./img/logo.png",
    name: "Dingo Coder",
    layout: 1,
    code: true,
    preview: true,
    ready: function() {
      var Dingo, code, codeList, codes, i, len;
      Dingo = {
        server: "http://localhost:9008/dingo.html",
        container: null,
        iframe: null,
        editor: {
          origin: window.location.href,
          codes: []
        }
      };
      codeList = document.createElement("div");
      codeList.innerHTML = this.innerHTML;
      codes = codeList.getElementsByTagName("textarea");
      for (i = 0, len = codes.length; i < len; i++) {
        code = codes[i];
        Dingo.editor.codes.push({
          type: code.getAttribute("code"),
          value: code.value
        });
      }
      Dingo.editor.icon = this.icon;
      Dingo.editor.name = this.name;
      Dingo.editor.layout = this.layout;
      Dingo.editor.code = this.code;
      Dingo.editor.preview = this.preview;
      Dingo.container = this.$.container;
      Dingo.iframe = createIframe(Dingo);
      window.addEventListener("messsage", function(e) {
        console.log("what the fuck!");
        return console.log(e);
      });
      return syncEditor(Dingo);
    }
  });
})();
