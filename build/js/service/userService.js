
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 define(function(require,a,b){"use strict";var c,d;return c=require("firebase"),d=function(){function a(a){this.fbRef=a}return a.prototype.getUser=function(){return this.fbRef.getAuth()},a.prototype.register=function(a,b,c){this.fbRef.createUser({email:a,password:b},function(a,b){return null!=c?c(a,b):void 0})},a.prototype.login=function(a,b,c){fbRef.authWithPassword({email:a,password:b},function(a,b){return null!=c?c(a,b):void 0})},a.prototype.logout=function(){this.fbRef.unauth()},a.prototype.changeEmail=function(a,b,c,d){this.fbRef.changeEmail({oldEmail:a,newEmail:b,password:c},function(a){return null!=d?d(a):void 0})},a.prototype.changePassword=function(a,b,c,d){this.fbRef.changePassword({email:a,oldPassword:b,newPassword:c},function(a){return null!=d?d(a):void 0})},a.prototype.resetPassword=function(a,b){this.fbRef.resetPassword({email:a},function(a){return null!=b?b(a):void 0})},a}(),b.exports=d});