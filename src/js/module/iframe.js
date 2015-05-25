// Generated by CoffeeScript 1.9.2
define(function(require, exports, module) {
  "use strict";
  var Iframe;
  Iframe = (function() {
    function Iframe(editor) {
      this.editor = editor;
      this.container = this.editor.container;
      this.element = this.editor.element;
      this.judgeiframe();
      if (this.setiframe) {
        this.ifr = document.createElement("iframe");
        this.ifr.id = "ifr_coder";
        this.ifr.scrolling = "yes";
        this.ifr.frameborder = 0;
        this.ifr.setAttribute("class", "renderer coder");
        this.container.find("#renderer-container").append(this.ifr);
      } else {
        this.ifr = null;
      }
    }

    Iframe.prototype.judgeiframe = function() {
      var code, i, len, ref, self;
      self = this;
      this.setiframe = false;
      ref = this.element.codes;
      for (i = 0, len = ref.length; i < len; i++) {
        code = ref[i];
        if (code.type === "html") {
          this.setiframe = true;
        }
      }
    };

    Iframe.prototype.refresh = function() {
      var doc, script, style;
      try {
        doc = this.editor.html_editor.doc.getValue().trim();
        if (doc === "") {
          doc = "<div></div>";
        }
        this.ifr.contentWindow.document.close();
        this.ifr.contentWindow.document.write(doc);
        style = document.createElement("style");
        script = document.createElement("script");
        style.textContent = this.editor.css_editor.doc.getValue();
        script.text = this.editor.js_editor.doc.getValue();
        this.ifr.contentWindow.document.head.appendChild(style);
        this.ifr.contentWindow.document.body.appendChild(script);
      } catch (_error) {}
    };

    Iframe.prototype.remove = function() {
      this.container.find(".coderead").trigger("click");
      return setTimeout(function() {
        this.container.find(".coderead").unbind();
        return this.container.find(".iframeread").removeClass("active").unbind();
      }, 100);
    };

    return Iframe;

  })();
  return module.exports = Iframe;
});
