
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 define(function(require,a,b){"use strict";var c,d,e,f;return e=require("../module/iframe"),c=require("../module/coder"),f=require("../module/layout"),d=function(){function a(a,b){this.container=a,this.attrs=b,this.container=$(this.container),this.ifr=new e(this.container,this),this.coder=new c(this.container,this,this.attrs),this.layout=new f(this.container,this.attrs)}return a.prototype.set_editor=function(a,b){return this[a+"_editor"].getDoc().setValue(b)},a.prototype.set_layout=function(){return this.layout.set_layout()},a.prototype.refresh=function(){return this.ifr.refresh()},a}(),b.exports=d});