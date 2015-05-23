
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 define(function(require,a,b){"use strict";var c,d;return c=require("firebase"),d=function(){function a(a){var b;this.service=a,this.user=this.service.authService.getUser(),this.userRef=new c("https://dingo-coder.firebaseio.com/users/"+(null!=(b=this.user)?b.uid:void 0))}return a.prototype.getUser=function(){return this.user},a.prototype.update=function(a,b){return this.userRef.update(a,function(a){return b(a)})},a.prototype.set=function(a,b){return this.userRef.set(a,function(a){return b(a)})},a.prototype.push=function(a,b,c){return this.userRef.child(a).push(b,function(a){return c(a)})},a.prototype.remove=function(a,b){return this.userRef.child(a).set(null,function(a){return b(a)})},a.prototype.destroy=function(a){return this.userRef.set(null,function(b){return a(b)})},a}(),b.exports=d});