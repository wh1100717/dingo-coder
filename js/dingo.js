
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 define(function(require,a,b){"use strict";var c,d,e,f,g;return d=require("./editor"),e=require("./module/mode"),f=require("./service/service"),window.service=f,g=function(a,b,c,d){var e;return e=null!=window.addEventListener?!1:!0,a[e?"attachEvent":"addEventListener"](""+(e?"on":"")+b,c,d||!1)},c={},c.init=function(){return g(window,"message",function(a){return c.element=JSON.parse(a.data),console.log("From postMessage",c.element),new d($("#editor"),c.element,f)})},b.exports=c});