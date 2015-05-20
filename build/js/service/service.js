
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 define(function(require,a,b){"use strict";var c,d,e;return c=require("firebase"),e=require("./userService"),d=function(){function a(){this.fbRef=new c("https://dingo-coder.firebaseio.com/"),this.userService=new e(this.fbRef)}return a.prototype.getUserService=function(){return this.userService},a}(),b.exports=d});