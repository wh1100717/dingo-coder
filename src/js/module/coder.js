// Generated by CoffeeScript 1.9.2
define(function(require, exports, module) {
  "use strict";
  var CodeMirror, Coder, beautify, mode;
  CodeMirror = require("codemirror/lib/codemirror");
  mode = require("./mode");
  beautify = require("../lib/beautify/index");
  Coder = (function() {
    function Coder(editor) {
      var flag, querycheck, self;
      this.editor = editor;
      this.container = this.editor.container;
      this.element = this.editor.element;
      self = this;
      flag = 0;
      this.event_bind();
      this.typelist = [];
      this.editor.ifr.codeList.find("textarea").each(function() {
        var code_type;
        flag++;
        code_type = $(this).attr("code");
        self.typelist.push(code_type);
        return require(["codemirror/mode/" + mode[code_type].mode + "/" + mode[code_type].mode], (function(_this) {
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
              mode: "" + mode[code_type].type
            });
            self.container.find("#code" + code_type).next().prepend("<div class='remind'>" + code_type + "</div>");
            code_content = $(_this).val();
            code_content = self.code_format(code_type, code_content);
            self.element.setAttribute(code_type, code_content);
            if (code_type === "js" || code_type === "css" || code_type === "html") {
              return self.editor[code_type + "_editor"].on("change", function() {
                return self.editor.ifr.refresh();
              });
            }
          };
        })(this));
      });
      querycheck = setInterval((function(_this) {
        return function() {
          var i, j, len, ref;
          if (flag !== 0) {
            return;
          }
          if (_this.editor.ifr.ifr === null) {
            _this.editor.ifr.remove();
          }
          _this.typelist = _this.typelist.reverse();
          ref = _this.typelist;
          for (j = 0, len = ref.length; j < len; j++) {
            i = ref[j];
            _this.fixlist(i);
          }
          _this.container.find(".mode-tab").eq(0).trigger("click");
          return clearInterval(querycheck);
        };
      })(this), 100);
      return;
    }

    Coder.prototype.fixlist = function(i) {
      this.container.find("div[codetype=code" + i + "]").prependTo(this.container.find("#mode-tabs"));
      this.container.find("#code" + i).next().prependTo(this.container.find("#code-editor"));
      return this.container.find("#code" + i).prependTo(this.container.find("#code-editor"));
    };

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

    Coder.prototype.event_bind = function() {
      var self;
      self = this;
      this.container.find("#mode-tabs").delegate("div", "click", function() {
        var toshow;
        if ($(this).hasClass("active")) {
          return;
        }
        self.container.find(".mode-tab").removeClass("active");
        $(this).addClass("active");
        self.container.find(".CodeMirror").removeClass("expansiondown");
        self.container.find(".CodeMirror").hide();
        toshow = $(this).attr("codetype");
        return self.container.find("#" + toshow).next().show();
      });
      return this.container.find(".mode").on("click", (function(_this) {
        return function() {
          _this.element.layout++;
          return self.editor.layout.set_layout();
        };
      })(this));
    };

    return Coder;

  })();
  return module.exports = Coder;
});