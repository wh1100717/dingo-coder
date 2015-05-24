
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 define(function(require,a,b){"use strict";var c,d,e,f,g;return d=require("./editor"),e=require("./module/mode"),f=require("./service/service"),window.service=f,g=function(a,b,c,d){var e;return e=null!=window.addEventListener?!1:!0,a[e?"attachEvent":"addEventListener"](""+(e?"on":"")+b,c,d||!1)},c={},c.init=function(){var a,b;return a=!1,b=setInterval(function(){return console.log("init_interval"),null!=window._dingo_element?(clearInterval(b),c.element=window._dingo_element,new d($("#editor"),c.element,f)):void 0},100)},b.exports=c});