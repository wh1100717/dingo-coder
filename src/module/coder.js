// Generated by CoffeeScript 1.9.2
define(function(require, exports, module) {
  "use strict";
  var CodeMirror, Coder, beautify, mode;
  CodeMirror = require("codemirror/lib/codemirror");
  beautify = require("./beautify/index");
  mode = require("./mode");
  Coder = (function() {
    function Coder(container, editor, attrs) {
      var codeList, flag, querycheck, self;
      this.container = container;
      this.editor = editor;
      this.attrs = attrs;
      self = this;
      flag = 0;
      codeList = $("<div>" + this.attrs.innerHTML + "</div>");
      codeList.find("textarea").each(function() {
        var code_type;
        flag++;
        code_type = $(this).attr("code");
        return require(["codemirror/mode/" + mode[code_type] + "/" + mode[code_type]], (function(_this) {
          return function() {
            var code_content, codemirrorinit, menu;
            flag--;
            menu = $("<div class='mode-tab' codetype='code" + code_type + "'>" + code_type + "<div class='arrow-up '></div></div>");
            self.container.find("#mode-tabs").append(menu);
            codemirrorinit = document.createElement("textarea");
            codemirrorinit.id = "code" + code_type;
            self.container.find("#code-editor").append(codemirrorinit);
            self.editor[code_type + "_editor"] = CodeMirror.fromTextArea(self.container.find("#" + codemirrorinit.id)[0], {
              theme: "monokai",
              lineNumbers: true,
              matchBrackets: true,
              mode: "text/" + code_type
            });
            code_content = $(_this).val();
            code_content = self.code_format(code_type, code_content);
            self.attrs.setAttribute(code_type, code_content);
            if (code_type === "js") {
              return self.editor[code_type + "_editor"].on("change", function() {
                clearTimeout(self.timeout);
                return self.timeout = setTimeout(function() {
                  return self.editor.ifr.refresh();
                }, 700);
              });
            } else {
              return self.editor[code_type + "_editor"].on("change", function() {
                return self.editor.ifr.refresh();
              });
            }
          };
        })(this));
      });
      querycheck = setInterval((function(_this) {
        return function() {
          if (flag !== 0) {
            return;
          }
          _this.container.find(".mode-tab").eq(0).addClass("active");
          _this.container.find("div[codetype='codehtml']").prependTo(_this.container.find("#mode-tabs"));
          _this.container.find(".mode-tab").eq(0).trigger("click");
          return clearInterval(querycheck);
        };
      })(this), 20);
      return;
    }

    Coder.prototype.code_format = function(type, content) {
      content = content.trim();
      switch (type) {
        case "html":
          content = beautify.html_beautify(content);
          break;
        case "css":
          content = beautify.css_beautify(content);
          break;
        case "js":
          content = beautify.js_beautify(content);
      }
      return content;
    };

    return Coder;

  })();
  return module.exports = Coder;
});