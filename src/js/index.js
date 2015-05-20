// Generated by CoffeeScript 1.9.2
define(function(require, exports, module) {
  "use strict";
  var Editor, Index, Service, mode;
  require("jquery");
  Editor = require("./editor");
  Service = require("./service/service");
  mode = require("./module/mode");
  Index = {};
  Index.init = function() {
    var service;
    service = new Service();
    Polymer("dingo-coder", {
      icon: "/img/logo.png",
      title: "Dingo Coder",
      layout: 1,
      ready: function() {
        return this.editor = new Editor(this.$.editor, this, service);
      },
      attributeChanged: function(attrName, oldVal, newVal) {
        if (mode[attrName] != null) {
          this.editor.set_editor(attrName, newVal);
        }
        if (attrName === "js" || attrName === "css" || attrName === "html") {
          return this.editor.refresh();
        }
      }
    });
  };
  return module.exports = Index;
});
