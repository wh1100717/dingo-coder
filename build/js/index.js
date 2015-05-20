
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 define(function(require,a,b){"use strict";var c,d,e,f;return require("jquery"),c=require("./editor"),e=require("./service/service"),f=require("./module/mode"),d={},d.init=function(){var a;a=new e,Polymer("dingo-coder",{icon:"/img/logo.png",title:"Dingo Coder",layout:1,ready:function(){return this.editor=new c(this.$.editor,this,a)},attributeChanged:function(a,b,c){return null!=f[a]&&this.editor.set_editor(a,c),"js"===a||"css"===a||"html"===a?this.editor.refresh():void 0}})},b.exports=d});