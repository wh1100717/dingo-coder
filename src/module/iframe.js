// Generated by CoffeeScript 1.9.2
define(function(require, exports, module) {
  "use strict";
  var Iframe;
  Iframe = (function() {
    function Iframe(container, editor) {
      this.container = container;
      this.editor = editor;
      this.ifr = document.createElement("iframe");
      this.ifr.id = "ifr_coder";
      this.ifr.scrolling = "yes";
      this.ifr.frameborder = 0;
      this.ifr.setAttribute("class", "renderer coder");
      this.container.find("#renderer-container").append(this.ifr);
    }

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
      this.container.find("iframe").remove();
      this.container.find(".coderead").trigger("click");
      this.container.find(".coderead").unbind();
      return this.container.find(".iframeread").removeClass("active").unbind();
    };

    return Iframe;

  })();
  return module.exports = Iframe;
});
